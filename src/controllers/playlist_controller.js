import axios from 'axios';
import Playlist from '../models/playlist_model';

const API_SEARCH_URL = 'https://api.spotify.com/v1/search';
const API_KEY = '9d4dc8d26d874e62a8fd2168be45d121';

export const getPlaylists = (req, res) => {
  const params = {
    part: 'snippet',
    key: API_KEY,
    q: req.params.genre, // call it genre?
    type: 'playlist',
  };

  return new Promise((resolve, reject) => {
    axios.get(API_SEARCH_URL, { params })
      .then((response) => {
        resolve(response.data.items);
      })
      .catch((error) => {
        console.log(`spotify api error: ${error}`);
        reject(error);
      });
  });
};

export const createPlaylist = (req, res) => {
//   res.send('in the method');
  const playlist = new Playlist();
  playlist.title = req.body.title;
  playlist.author = req.user.username;
  //   playlist.songs= unsure

  // Create a private playlist
};
// Q: this creates it on the user's actual spotify account. Do we want to do
// this or do we want to use our own data structure?

// realizing this is obviously not going to be correct
// bc we need location services

export const getPlaylist = (req, res) => {
  Playlist.findById(req.params.id)
    .then((result) => {
      // console.log(`in getsPost: ${result}`);
      res.json((result));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const deletePlaylist = (req, res) => {
  Playlist.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ message: 'Playlist deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const updatePlayist = (req, res) => {
  Playlist.findById(req.params.id)
    .then((result) => {
      // assign things
      result.save();
    })
    .then((result) => {
      res.json({ message: 'Playlist updated!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
