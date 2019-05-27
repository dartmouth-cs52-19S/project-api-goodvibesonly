import axios from 'axios';

const request = require('request');

const API_PLAYER_URL = 'https://api.spotify.com/v1/me/player';

export const getPlayState = (req, res) => {
  axios.get(`${API_PLAYER_URL}/currently-playing`, { headers: { authorization: `Bearer ${req.params.token}` } })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};

export const sendPlaySong = (req, res) => {
  axios.get(`${API_PLAYER_URL}/devices`, { headers: { authorization: `Bearer ${req.params.token}` } })
    .then((response) => {
      const devId = response.data.devices[0].id;
      const authOptions = {
        url: 'https://api.spotify.com/v1/me/player/play',
        headers: {
          // eslint-disable-next-line no-buffer-constructor
          Authorization: `Bearer ${req.params.token}`,
        },
        qs: {
          // eslint-disable-next-line quote-props
          'device_id': devId,
          // eslint-disable-next-line quote-props
          'device_ids': devId,
          // eslint-disable-next-line quote-props
          'context_uri': `spotify:track: ${req.body.song_id}`,
        },
        json: true,
      };

      request.put(authOptions, (error, r, body) => {
        if (!error) {
          console.log(r);
        } else {
          console.log(error);
        }
      });
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};

export const sendPlay = (req, res) => {
  axios.get(`${API_PLAYER_URL}/devices`, { headers: { authorization: `Bearer ${req.params.token}` } })
    .then((response) => {
      const devId = response.data.devices[0].id;
      const authOptions = {
        url: 'https://api.spotify.com/v1/me/player/play',
        headers: {
          // eslint-disable-next-line no-buffer-constructor
          Authorization: `Bearer ${req.params.token}`,
        },
        qs: {
          // eslint-disable-next-line quote-props
          'device_id': devId,
          // eslint-disable-next-line quote-props
          'device_ids': devId,
        },
        json: true,
      };

      request.put(authOptions, (error, r, body) => {
        if (!error) {
          console.log(r);
        } else {
          console.log(error);
        }
      });
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};

export const sendPause = (req, res) => {
  axios.get(`${API_PLAYER_URL}/devices`, { headers: { authorization: `Bearer ${req.params.token}` } })
    .then((response) => {
      const devId = response.data.devices[0].id;
      const authOptions = {
        url: 'https://api.spotify.com/v1/me/player/pause',
        headers: {
          // eslint-disable-next-line no-buffer-constructor
          Authorization: `Bearer ${req.params.token}`,
        },
        qs: {
          // eslint-disable-next-line quote-props
          'device_id': devId,
          // eslint-disable-next-line quote-props
          'device_ids': devId,
        },
        json: true,
      };

      request.put(authOptions, (error, r, body) => {
        if (!error) {
          console.log(r);
        } else {
          console.log(error);
        }
      });
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};
