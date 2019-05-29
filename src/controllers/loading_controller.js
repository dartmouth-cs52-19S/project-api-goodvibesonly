/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv';
/* import axios from 'axios';
import React from 'react';
import { renderToString, readDomServer } from 'react-dom/server';
import User from '../models/user_model';
import Page from '../loading_page';
*/
// import jwt from 'jwt-simple';

dotenv.config({ silent: true });

export const loading = (req, res, next) => {
  res.send({ SUCCESS: 'you have signed into Vibes!' });
};

export const loading_old = (req, res, next) => {
  res.render('<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><title></title></head><body>Loading</body></html>');
};
