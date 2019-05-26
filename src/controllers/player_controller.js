import axios from 'axios';

const request = require('request');

const API_PLAYER_URL = 'https://api.spotify.com/v1/me/player';

export const getPlayState = (req, res) => {
  axios.get(`${API_PLAYER_URL}/currently-playing`, { headers: { authorization: `Bearer ${req.params.token}` } })
    .then((response) => {
      res.send(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};

export const sendPlay = (req, res) => {
  console.log('entered backend play ', req.params.token);
  // axios.put(`${API_PLAYER_URL}/play`, { headers: { authorization: `Bearer ${req.params.token}` } })
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(`spotify api error: ${error}`);
  //   });
  axios.get(`${API_PLAYER_URL}/devices`, { headers: { authorization: `Bearer ${req.params.token}` } })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      // eslint-disable-next-line camelcase
      const dev_id = response.data.devices[0].id;
      console.log(dev_id);
      const authOptions = {
        url: 'https://api.spotify.com/v1/me/player',
        headers: {
          // eslint-disable-next-line no-buffer-constructor
          Authorization: `Bearer ${req.params.token}`,
        },
        params: {
          device_id: dev_id,
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
  console.log('entered backend pause ', req.params.token);
  axios.put(`${API_PLAYER_URL}/pause`, { headers: { authorization: `Bearer ${req.params.token}` } })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};
