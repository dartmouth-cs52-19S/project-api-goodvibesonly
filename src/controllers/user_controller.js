/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv';
import User from '../models/user_model';
// import jwt from 'jwt-simple';

dotenv.config({ silent: true });

/* Commented out for now, as we don't have this stage fully set up; encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
const querystring = require('querystring');
const spClientCallback = 'http://danah-blog.surge.sh/';
const spotifyEndpoint = 'https://accounts.spotify.com/api/token';
*/

const client_id = 'b4a7ad189bdb424aad1d1a4773a6ddf6'; // Your client id
const client_secret = 'e9dc54316afb430b986542e2b431b6a0'; // Your secret
const redirect_uri = 'https://good-vibes-only.herokuapp.com/api'; // Your redirect uri
const request = require('request'); // "Request" library

export const signin = (req, res, next) => {
  const scopes = 'user-read-private user-read-email';
  res.redirect(`${'https://accounts.spotify.com/authorize'
  + '?response_type=code'
  + '&client_id='}${client_id
  }${scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
  }&redirect_uri=${encodeURIComponent(redirect_uri)}`);
};

export const signinDanah = (req, res, next) => {
  res.send({ message: 'you have successfully signed into good vibes!' });
};

export const auth = (req, res, next) => {
  // this is authentication for a new user
  // TODO: handle processes for returning users
  const code = req.query.code || null;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      // eslint-disable-next-line no-buffer-constructor
      Authorization: `Basic ${new Buffer(`${client_id}:${client_secret}`).toString('base64')}`,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token } = body;
      const { refresh_token } = body;

      const user = new User();
      user.access_token = access_token;
      user.refresh_token = refresh_token;

      user.save().then(() => {
        res.json({ message: 'User created with tokens saved to user' });
      }).catch((error_message) => {
        res.status(500).json({ error_message });
      });
    }
  });
};

/*
OLD AUTH
export const auth = (req, res, next) => {
  // this is authentication for a new user
  // TODO: handle processes for returning users
  const code = req.query.code || null;
  // const state = req.query.state || null;

  const user = new User();
  user.code = code;

  user.save()
    .then(() => {
      getToken(code);
      res.json({ message: 'User created and code saved to user' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

*/

export const signup = (req, res, next) => {
  // TODO: fill out function

};
