import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

/**
 * @route  /api/v1/products
 */
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

export default router;