import { Router } from 'express';
import * as UserController from './controllers/user_controller';
// import * as Playlists from './controllers/playlist_controller';
// import { /* requireAuth, */ requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the good vibes only api!' });
});

// your routes will go here
router.post('/signin', UserController.signin);

router.route('/auth')
  .post(UserController.auth)
  .get(UserController.auth);

/*
router.route('/playlists')
  .post(Playlists.createPost)
  .get(Playlists.getPosts);
*/

export default router;
