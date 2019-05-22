import axios from 'axios';

import Playlist from '../models/playlist_model';

const API_SEARCH_URL = 'https://api.spotify.com/v1/search';
const API_KEY = '9d4dc8d26d874e62a8fd2168be45d121';
const API_PLAYLIST_URL = 'https://api.spotify.com/v1/playlists';

export const deletePlaylist = (req, res) => {
  Playlist.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ message: 'Playlist deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPlaylists = (req, res) => {
  Playlist.find({})
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPlaylist = (req, res) => {
  Playlist.findById(req.params.id)
    .then((result) => {
      res.json((result));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPlaylistsFromGenre = (req, res) => {
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
    limit: 15,
  };
  // items[]track.id
  return new Promise((resolve, reject) => {
    axios.get(`${API_PLAYLIST_URL}/${req.params.playlistid}/tracks`, { headers: { authorization: 'BQBJSlfhZJQODsxWsQRmNC6F7DFXZkVQxPrCPlYuyUx5BWc00WgZWSEG9Pa2JcxC0yS6aZ5-w5pWFs7PY8WpBOMptbPhtMfwsRKKUpnJt1P924WdLslHBl4Lu6K9LeygjPtUzAMraCVuWCuBVjQ' } }, { params })
      .then((response) => {
        const firstSeeds = response.items;
        firstSeeds.map((song, key) => playlist.songs.push(song.track.id));
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

export const addSong = (req, res) => {
  Playlist.findById(req.params.playlistId)
    .then((result) => {
      result.songs.push(req.params.spotifyID);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
