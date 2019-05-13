import { Router } from 'express';
import * as UserController from './controllers/user_controller';
import { /* requireAuth, */ requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the good vibes only api!' });
});

// your routes will go here
router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

export default router;
