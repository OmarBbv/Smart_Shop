import express from 'express';
import authController from '../controllers/wishlistController.js';
import authorizeRole from '../middlewares/authorizeRole.js';

const router = express.Router();

/**
 * @route  /api/v1/wishlist
 * @desc   Wishlist operations
 */

router.post('/:id', authorizeRole.isUser, authController.addToWishlist);
router.delete('/:id', authorizeRole.isUser, authController.removeFromWishlist);
router.get('/', authorizeRole.isUser, authController.getAllWishlistItems);


export default router