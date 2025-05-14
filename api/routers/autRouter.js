import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

/**
 * @route  /api/v1/auth
 */

router.post('/signIn', authController.signIn)
router.post('/signUp', authController.signUp)

export default router