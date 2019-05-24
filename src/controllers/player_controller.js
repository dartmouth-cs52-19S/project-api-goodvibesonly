import axios from 'axios';

const API_PLAYER_URL = 'https://api.spotify.com/v1/me/player';

export const getPlayState = (req, res) => {
  console.log(req.body.token);
  axios.get(`${API_PLAYER_URL}/currently-playing`, { headers: { authorization: `Bearer ${req.body.token}` } })
    .then((response) => {
      res.send(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};

export const sendPlay = (req, res) => {
  axios.put(`${API_PLAYER_URL}/play`, { headers: { authorization: `Bearer ${req.body.token}` } })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};

export const sendPause = (req, res) => {
  axios.put(`${API_PLAYER_URL}/pause`, { headers: { authorization: `Bearer ${req.body.token}` } })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};
