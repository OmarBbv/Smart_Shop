import express from 'express';
import productController from '../controllers/productController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

/**
 * @route  /api/v1/products
 */
router.post('/', upload.array('images'), productController.createProduct);
router.put('/:id', upload.array('images'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

export default router;