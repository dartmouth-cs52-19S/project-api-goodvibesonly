import axios from 'axios';
import Playlist from '../models/playlist_model';

const API_SEARCH_URL = 'https://api.spotify.com/v1/search';
const API_KEY = '9d4dc8d26d874e62a8fd2168be45d121';
const API_PLAYLIST_URL = 'https://api.spotify.com/v1/playlists';

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
  Playlist.findById(req.params.id).lean().populate('author').then((playlist) => {
    res.json({ playlist });
  })
    .catch((error) => {
      res.json({ error: error.message });
    });
};

export const deletePlaylist = (req, res) => {
  Playlist.findByIdAndRemove(req.params.id).then((playlist) => {
    res.send(`deleted playlist with id ${req.params.id}`);
  }).catch((error) => {
    res.json({ error: error.message });
  });
};

export const activatePlaylist = (req, res) => {
  // Sets the location field of the playlist to a new array of [lat, lng] given
  // in req
  //
  // Data in req:
  // - req.body.lat
  // - req.body.lng
};

export const createPlaylist = (req, res) => {
//   res.send('in the method');
//   The things that will be in req is the spotifyID for the playlist,
//   user id, and the playlist title.
//   - req.body.spotifyID
//   - req.body.userId
//   - req.body.title
//
//   This function will need to make the spotify api calls to get the playlist
//   and first 15 songs.
//
//   Then save the playlist with the author, the spotifyId, and the songs.
//

  const playlist = new Playlist();
  playlist.title = req.body.title;
  playlist.author = req.body.userId;
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
  Playlist.findById(req.params.playlistid)
    .then((result) => {
      result.songs.push(req.params.trackId);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// ------------------- SPOTIFY API RELATED FUNCTIONS ------------------------ //

// Fetches playlists from Spotify API based on query word
export const getPlaylistsFromSpotify = (req, res) => {
  const params = {
    key: API_KEY,
    q: req.params.query, // call it genre?
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

// Fetches tracks from Spotify API based on the track spotify // id
export const getTrackFromSpotify = (req, res) => {
  // API calls here
};
