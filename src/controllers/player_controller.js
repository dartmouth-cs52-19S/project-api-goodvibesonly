import axios from 'axios';

const API_PLAYER_URL = 'https://api.spotify.com/v1/me/player';
const token = 'Bearer BQANZ0wlxkL2BbutjiFxNJ-fUXkgI41JvFRSc5EMIsUOfqwliothX8ivnlMZ6zsUNuYYEmSN9FMx0Q_J1n4X2KqodotaACDfRziQ9iBpMh8-jg0FPdjT9G33ZlcftIinrelIqc9VhXQ8rfrivnh1w12ULgdYMtV2c-RyOTKQsa2lyq7OM5xhjyzySEpPsq3cbTtdoPLMKfUy2GNkkwYeC2TfGQmoAIbUJBzzmFlDG-BB9E1IThucVoKUB_dJkN2hIwXWlqQaYrB7NwcFG8H7mHQ';

export const getPlayState = (req, res) => {
  axios.get(`${API_PLAYER_URL}/currently-playing`, { headers: { authorization: token } })
    .then((response) => {
      res.send(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};

export const sendPlay = (req, res) => {
  axios.put(`${API_PLAYER_URL}/play`, { headers: { authorization: token } })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};

export const sendPause = (req, res) => {
  axios.put(`${API_PLAYER_URL}/pause`, { headers: { authorization: token } })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};
