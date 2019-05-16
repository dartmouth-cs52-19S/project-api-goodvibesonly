import dotenv from 'dotenv';
// import jwt from 'jwt-simple';
// import User from '../models/user_model';

dotenv.config({ silent: true });

// and then the secret is usable this way: process.env.AUTH_SECRET;

/* Commented out for now, as we don't have this stage fully set up; encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
*/

export const signin = (req, res, next) => {
  res.send({ message: 'you have successfully signed into good vibes!' });
};

export const signup = (req, res, next) => {
  // TODO: fill out function

};
