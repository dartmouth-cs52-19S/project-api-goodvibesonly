import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// and then the secret is usable this way: process.env.AUTH_SECRET;

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).send('You must provide email and password');
  }
  // here you should do a mongo query to find if a user already exists with this email.
  User.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      // if user exists then return an error.
      res.send('User already exists with this email');
    } else {
      // if not, use the User model to create a new user.
      const user = new User();

      user.email = req.body.email;
      user.password = req.body.password;
      user.username = req.body.username;

      // Save the new User object
      user.save()
        .then(() => {
          // and then return a token same as you did in in signin
          res.send({ token: tokenForUser(user) });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  });
};
