import Playlist from '../models/playlist_model';

export const createPlaylist = (req, res) => {
//   res.send('in the method');
  const playlist = new Playlist();
  playlist.title = req.body.title;
  post.author = req.user.username;
  //   playlist.songs= unsure

  platlist.save()
    .then((result) => {
      res.json({ message: 'Playlist created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
// realizing this is obviously not going to be correct
// bc we need location services
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
