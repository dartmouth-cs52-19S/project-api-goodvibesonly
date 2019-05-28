import axios from 'axios';
import Playlist from '../models/playlist_model';
import User from '../models/user_model';

const API_SEARCH_URL = 'https://api.spotify.com/v1/search';

const API_PLAYLIST_URL = 'https://api.spotify.com/v1/playlists';
const API_PLAYER_URL = 'https://api.spotify.com/v1/me/player';
const token = 'Bearer BQCCiW2xxvjz8gVFyf_9T7HB8ekzsh0PAjn44_Uu0MUmO30N-y4pNKw7jfeYdeoRKFoXAhY9OCiXH23vfS_rPqcRK33JM10K4HZ12bQM70cCFQ1K-ckFkjyUGWSZZN9_MQxOMfBJGpQQPmLPecxnnJWIJjq6nLykQXp4K2w8';
const API_TRACK_URL = 'https://api.spotify.com/v1/tracks';
const API_USER_URL = 'https://api.spotify.com/v1/users';

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
  Playlist.findById(req.params.id).lean().then((playlist) => {
    res.json({ playlist });
  }).catch((error) => {
    console.log('ERROR IN FETCH', error);
    res.status(404).send(error);
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
  // - req.params.id
  Playlist.findById(req.params.id).lean().populate('author').then((playlist) => {
    playlist.location.push(req.body.lat);
    playlist.location.push(req.body.long);
  })
    .catch((error) => {
      res.json({ error: error.message });
    });
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
  playlist.location = [req.body.lat, req.body.lng];

  User.findById(req.body.userId).then((user) => {
    const params = {
      limit: 5,
    };

    console.log('token in backend', user.access_token);

    axios.get(`${API_PLAYLIST_URL}/${req.body.spotifyId}/tracks`, { headers: { authorization: `Bearer ${user.access_token}` }, params })
      .then((response) => {
        const firstSeeds = response.data.items;
        console.log(response.data.items[0].track.id);
        firstSeeds.map((song, key) => {
          return playlist.songs.push({ songid: song.track.id, name: song.track.name, artist: song.track.artists[0].name });
        });

        console.log('songs', playlist.songs[0]);

        // New Stuff
        axios.post(`${API_USER_URL}/${user.spotifyId}/playlists`, { headers: { authorization: `Bearer ${user.access_token}`, 'Content-type': 'application/json' } }).then((playlistResponse) => {
          console.log('NEW PLAYLIST IN SPOTIFY CREATED');
          const playlistId = playlistResponse.data.id;
          console.log('playlistId', playlistId);

          playlist.spotifyId = playlistId;

          playlist.save()
            .then((result) => {
              console.log('RESULT IN CREATE', result);

              const uris = [];

              playlist.songs.map((song) => {
                return uris.push(`spotify:track:${song.songid}`);
              });

              axios.post(`${API_PLAYLIST_URL}/${playlistId}/tracks`, { headers: { authorization: `Bearer ${user.access_token}`, uris } }).then((addTracksResponse) => {
                console.log('successfully added');
                res.json({ message: 'Playlist created!', playlistId: playlist._id, playlist: JSON.stringify(result) });
              }).catch((addTracksError) => {
                console.log(addTracksError);
                res.status(400).json({ addTracksError });
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({ error });
            });
        }).catch((creationError) => {
          console.log(creationError);
        });
      })
      .catch((error) => {
        console.log(`spotify api error: ${error}`);
      });
  }).catch((err) => {
    console.log('user not found: ', err);
  });
};

export const addSong = (req, res) => {
  Playlist.findById(req.params.id)
    .then((result) => {
      console.log('SONGS', result.songs);
      result.songs.push({ songid: req.body.trackId, name: req.body.name, artist: req.body.artist });
      console.log('SONGS AFTER PUSH', result.songs);

      Playlist.findByIdAndUpdate(req.params.id, {
        songs: result.songs,
      }).then((response) => {
        console.log('ENTERING SUCCESSFULLY UPDATED');
        res.json({ message: 'successfully updated!' });
      }).catch((updateError) => {
        console.log('UPDATE ERROR', updateError);
        res.status(500).json(updateError);
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// ------------------- SPOTIFY API RELATED FUNCTIONS ------------------------ //

// Fetches playlists from Spotify API based on query word
export const getPlaylistsFromSpotify = (req, res) => {
  const params = {
    q: req.body.query, // call it genre?
    type: 'playlist',
  };
  let playlists;
  axios.get(API_SEARCH_URL, { headers: { authorization: 'BQDJGwuXR34oWrBMH5wkQ3KNaUhaumSDYUwtfjEzfrgY5S86a0jkAJBrbicE4BdQpgS0HYxZ8do6yDoXUGovfQoqNGLwwOHrXo-i4o10DF5nwANe8LW7GgfosReUmqtru5VNynz54XAxT7RD6yQ' } }, { params })
    .then((response) => {
      response.data.items.map((playlist, key) => playlists.push({ id: playlist.id, title: playlist.name }));
      res.json(playlists);
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
      res.send(error);
    });
};

// Fetches tracks from Spotify API based on the track spotify // id
// takes a param req.params.id, which is the id of the track you want to get
export const getTrackFromSpotify = (req, res) => {
  // API calls here

  return new Promise((resolve, reject) => {
    axios.get(`${API_TRACK_URL}/${req.params.id}`, { headers: { authorization: 'BQDJGwuXR34oWrBMH5wkQ3KNaUhaumSDYUwtfjEzfrgY5S86a0jkAJBrbicE4BdQpgS0HYxZ8do6yDoXUGovfQoqNGLwwOHrXo-i4o10DF5nwANe8LW7GgfosReUmqtru5VNynz54XAxT7RD6yQ' } })
      .then((response) => {
        res.json(response.data.id);
      })
      .catch((error) => {
        console.log(`spotify api error: ${error}`);
        reject(error);
      });
  });
};

export const getPlayState = (req, res) => {
  axios.get(`${API_PLAYER_URL}/currently-playing`, { headers: { authorization: token } })
    .then((response) => {
      res.send(response.data);
      console.log('POST RESPONSE: ', JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(`spotify api error: ${error}`);
    });
};
