import axios from 'axios';

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
  const params = {
    uris: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
  };

  console.log('entered backend play ', req.params.token);
  axios.put(`${API_PLAYER_URL}/play`, { headers: { authorization: `Bearer ${req.params.token}` }, params })
    .then((response) => {
      console.log(JSON.stringify(response.data));
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
