import { Router } from 'express';
import * as UserController from './controllers/user_controller';
// import * as Playlists from './controllers/playlist_controller';
import * as Player from './controllers/player_controller';
import * as Playlists from './controllers/playlist_controller';
// import { /* requireAuth, */ requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the good vibes only api!' });
});

// your routes will go here
router.post('/signin', UserController.signin);
router.get('/playstate', Player.getPlayState);
router.put('/play', Player.sendPlay);
router.put('/pause', Player.sendPause);

router.route('/auth')
  .post(UserController.auth)
  .get(UserController.auth);


router.route('/playlists')
  .post(Playlists.createPlaylist)
  .get(Playlists.getPlaylists);


router.route('/playlists/:id')
  .put(/* requireAuth, */ Playlists.addSong)
  .get(Playlists.getPlaylist)
  .delete(/* requireAuth, */Playlists.deletePlaylist);

export default router;
