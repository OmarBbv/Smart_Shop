import express from 'express';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

/**
    * @route  /api/v1/categories
    */

router.post('/', categoryController.addCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryByIdOrSlug);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/:id/products', categoryController.getProductsForCategoryAndSubcategories);

export default router;