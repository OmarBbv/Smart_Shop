import express from 'express';
import userController from '../controllers/userController.js';
import authorizeRole from '../middlewares/authorizeRole.js';

const router = express.Router();

/**
 * @route  /api/v1/users
 */

router.get('/', userController.allUsers);
router.get('/:id', userController.getUser);
// router.put('/', authorizeRole.isUser, userController.updateUser);

export default router;