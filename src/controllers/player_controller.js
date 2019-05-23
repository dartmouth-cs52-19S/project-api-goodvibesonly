import axios from 'axios';

const API_PLAYER_URL = 'https://api.spotify.com/v1/me/player';
const token = 'Bearer BQCJHZcRKBvzOdN1yMkckvUyYgOD1BGf9pBlGVoDF0hqS3tbPlgPY295gnZhYT5pZVCG3yoBGszynxpDaK3V55lVYAdEfj9aEcJiKQysN4n36zaVUNo6BCmCClRBOSolUewISls5CGO54cGonLIJGeGZTzEhAswHL1NAZOWWkdoCj8hkCWDuRJylzYF-ZxStm9yuG6FMgRfBCb8VnD2zORSUsdJq-M8LUOTwZxLexsNbuaXnPEii_kBxczGGI6zdl48UvDyLuQZC1RHAltwiR1E';

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
