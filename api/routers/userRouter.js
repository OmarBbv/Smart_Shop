import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

/**
 * @route  /api/v1/users
 */

router.get('/', userController.allUsers);
router.get('/:id', userController.getUser);

export default router;