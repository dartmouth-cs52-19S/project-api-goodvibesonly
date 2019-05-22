import axios from 'axios';
import jQuery from 'jquery';
import Playlist from '../models/playlist_model';

const API_SEARCH_URL = 'https://api.spotify.com/v1/search';
const API_KEY = '9d4dc8d26d874e62a8fd2168be45d121';
const API_PLAYLIST_URL = 'https://api.spotify.com/v1/playlists';

export const getPlaylists = (req, res) => {
  const params = {
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

  const params = {
    key: API_KEY,
    limit: 5,
  };

  return new Promise((resolve, reject) => {
    axios.get(`${API_PLAYLIST_URL}/${req.params.playlistid}/tracks`, { params })
      .then((response) => {
        // actually need to cycle through each track & add id to playlist but how tf do i do that
        // eslint-disable-next-line no-unused-expressions
        // eslint-disable-next-line func-names
        jQuery.each(response.data.track, (key, _value) => {
          const newList = playlist.state.songs.concat(key.track.id);
          playlist.setState({ songs: newList });
        });
      })
      .catch((error) => {
        console.log(`spotify api error: ${error}`);
        reject(error);
      });

    playlist.save()
      .then((result) => {
        res.json({ message: 'Playlist created!' });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
  // Create a private playlist
};
