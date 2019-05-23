/* eslint-disable camelcase */
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

// eslint-disable-next-line no-unused-vars
/* const client_id = 'b4a7ad189bdb424aad1d1a4773a6ddf6'; // Your client id
const client_secret = 'e9dc54316afb430b986542e2b431b6a0'; // Your secret
const redirect_uri = 'http://danah-blog.surge.sh/'; // Your redirect uri
const querystring = require('querystring');
const spClientCallback = 'http://danah-blog.surge.sh/';
const spotifyEndpoint = 'https://accounts.spotify.com/api/token';
*/

const client_id = 'b4a7ad189bdb424aad1d1a4773a6ddf6'; // Your client id
const redirect_uri = 'https://good-vibes-only.herokuapp.com/api'; // Your redirect uri

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
  const code = req.query.code || null;
  const state = req.query.state || null;

  // sendFile adapted from https://stackoverflow.com/questions/20345936/nodejs-send-html-file-to-client
  // this code sends a new file to be rendered on the frontend
  res.send({ message: { the_code: code, the_state: state } }).next().sendFile('views/redirect.html', { root: __dirname });
};

export const signup = (req, res, next) => {
  // TODO: fill out function

};
