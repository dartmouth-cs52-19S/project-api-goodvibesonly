import { Router } from 'express';
import * as UserController from './controllers/user_controller';
// import * as Playlists from './controllers/playlist_controller';
import * as Player from './controllers/player_controller';
import * as Playlists from './controllers/playlist_controller';
// import { /* requireAuth, */ requireSignin } from './services/passport';
import * as Page from './controllers/loading_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the good vibes only api!' });
});

// your routes will go here
router.post('/signin', UserController.signin);
router.get('/playstate/:token', Player.getPlayState);
router.put('/play/:token', Player.sendPlay);
router.put('/pause/:token', Player.sendPause);
router.put('/playsong/:token/:song_id', Player.sendPlaySong);
// router.put('/playplaylist/:token/:playlistid', Player.sendPlayPlaylist);

router.get('/auth/done', Page.loading);


router.route('/auth')
  .post(UserController.auth)
  .get(UserController.auth);

router.route('/playlists/:id')
  .put(/* requireAuth, */ Playlists.addSong)
  .get(Playlists.getPlaylist)
  .delete(/* requireAuth, */Playlists.deletePlaylist);

router.route('/playlists')
  .post(Playlists.createPlaylist)
  .get(Playlists.getPlaylists);

export default router;
