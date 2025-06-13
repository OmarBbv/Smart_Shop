import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

/**
 * @route  /api/v1/auth
 */

router.post('/signin', authController.signIn)
router.post('/signup', authController.signUp)
router.post('/refresh-token', authController.refreshToken);

export default router