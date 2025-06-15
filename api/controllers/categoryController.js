import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import { Op } from 'sequelize';
import { generateSlug } from '../configs/slugify.js';

const categoryController = {
    /**
     * @desc    Add a new category
     * @route   POST /api/v1/categories
     * @access  Private/Admin 
     */
    addCategory: asyncHandler(async (req, res) => {
        const { name, parentId } = req.body;

        if (!name) {
            res.status(400);
            throw new Error('Kateqoriya üçün ad mütləqdir.');
        }

        const slug = generateSlug(name);

        const slugExists = await Category.findOne({ where: { slug } });
        if (slugExists) {
            res.status(400);
            throw new Error('Bu slug artıq mövcuddur. Xahiş edirəm unikal bir ad istifadə edin.');
        }

        if (parentId) {
            const parentCategory = await Category.findByPk(parentId);
            if (!parentCategory) {
                res.status(404);
                throw new Error('Ana kateqoriya tapılmadı.');
            }
        }

        try {
            const category = await Category.create({
                name,
                slug,
                parentId: parentId || null,
            });

            res.status(201).json(category);
        } catch (error) {
            res.status(500);
            throw new Error(`Kateqoriya yaradılarkən xəta baş verdi: ${error.message}`);
        }
    }),

    /**
     * @desc    Get all categories (optionally with hierarchy)
     * @route   GET /api/v1/categories
     * @access  Public
     */
    getAllCategories: asyncHandler(async (req, res) => {
        try {
            // Fetch top-level categories and their direct subcategories
            const categories = await Category.findAll({
                where: { parentId: null }, // Fetch only top-level categories
                include: [{
                    model: Category,
                    as: 'subcategories',
                    // To fetch nested subcategories recursively (can be performance intensive for deep hierarchies)
                    // you might need a more complex query or multiple queries.
                    // For now, this fetches one level of subcategories.
                    // For deeper nesting, consider a separate recursive function or a different strategy.
                    include: [{
                        model: Category,
                        as: 'subcategories', // Second level
                        include: [{
                            model: Category,
                            as: 'subcategories' // Third level - adjust as needed
                        }]
                    }]
                }],
                order: [['name', 'ASC']] // Optional: order by name
            });
            res.status(200).json(categories);
        } catch (error) {
            res.status(500);
            throw new Error(`Error fetching categories: ${error.message}`);
        }
    }),

    /**
     * @desc    Get a single category by ID or Slug
     * @route   GET /api/v1/categories/:identifier
     * @access  Public
     */
    getCategoryByIdOrSlug: asyncHandler(async (req, res) => {
        const { identifier } = req.params;
        let category;

        try {
            if (!isNaN(identifier)) {
                category = await Category.findByPk(identifier, {
                    include: [
                        { model: Category, as: 'parent' },
                        {
                            model: Category,
                            as: 'subcategories',
                            include: [{ model: Product, as: 'products' }]
                        },
                        { model: Product, as: 'products' }
                    ]
                });
            } else {
                category = await Category.findOne({
                    where: { slug: identifier },
                    include: [
                        { model: Category, as: 'parent' },
                        {
                            model: Category,
                            as: 'subcategories',
                            include: [{ model: Product, as: 'products' }]
                        },
                        { model: Product, as: 'products' }
                    ]
                });
            }

            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404);
                throw new Error('Category not found.');
            }
        } catch (error) {
            res.status(error.statusCode || 500);
            throw new Error(error.message || `Error fetching category: ${identifier}`);
        }
    }),

    /**
     * @desc    Update a category
     * @route   PUT /api/v1/categories/:id
     * @access  Private/Admin
     */
    updateCategory: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { name, slug, parentId } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            res.status(404);
            throw new Error('Category not found.');
        }

        // Check if new slug already exists (and it's not the current category's slug)
        if (slug && slug !== category.slug) {
            const slugExists = await Category.findOne({ where: { slug } });
            if (slugExists) {
                res.status(400);
                throw new Error('Category slug already exists. Please use a unique slug.');
            }
            category.slug = slug;
        }

        if (name) {
            category.name = name;
        }

        // Handle parentId update
        if (parentId !== undefined) { // Allows setting parentId to null
            if (parentId === null) {
                category.parentId = null;
            } else {
                // Check if parentId is the category itself
                if (parseInt(parentId, 10) === category.id) {
                    res.status(400);
                    throw new Error('A category cannot be its own parent.');
                }
                // Check if the new parent category exists
                const parentCategory = await Category.findByPk(parentId);
                if (!parentCategory) {
                    res.status(404);
                    throw new Error('Parent category not found.');
                }
                // Advanced: Prevent circular dependencies (e.g., setting a parent to one of its own children)
                // This requires a more complex check, potentially traversing up the tree from the proposed parent.
                // For simplicity, this basic check is included.
                category.parentId = parentId;
            }
        }


        try {
            const updatedCategory = await category.save();
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500);
            throw new Error(`Error updating category: ${error.message}`);
        }
    }),

    /**
     * @desc    Delete a category
     * @route   DELETE /api/v1/categories/:id
     * @access  Private/Admin
     */
    deleteCategory: asyncHandler(async (req, res) => {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            res.status(404);
            throw new Error('Category not found.');
        }

        const productsCount = await Product.count({ where: { categoryId: id } });
        if (productsCount > 0) {
            res.status(400);
            throw new Error(`Cannot delete category: It has ${productsCount} associated product(s). Please reassign or delete them first.`);
        }

        // 2. Check for subcategories
        const subcategoriesCount = await Category.count({ where: { parentId: id } });
        if (subcategoriesCount > 0) {
            res.status(400);
            throw new Error(`Cannot delete category: It has ${subcategoriesCount} subcategory/subcategories. Please delete or reassign them first.`);
        }

        try {
            await category.destroy();
            res.status(200).json({ message: 'Category deleted successfully.' });
        } catch (error) {
            res.status(500);
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }),

    /**
     * @desc    Get all products for a specific category (including its subcategories)
     * @route   GET /api/v1/categories/:identifier/products
     * @access  Public
     */
    getProductsForCategoryAndSubcategories: asyncHandler(async (req, res) => {
        const { identifier } = req.params;
        const { minPrice, maxPrice, sort = 'asc', page = 1, limit = 10 } = req.query;

        let targetCategory;

        if (!isNaN(identifier)) {
            targetCategory = await Category.findByPk(identifier);
        } else {
            targetCategory = await Category.findOne({ where: { slug: identifier } });
        }

        if (!targetCategory) {
            res.status(404);
            throw new Error('Category not found.');
        }

        const getAllSubcategoryIds = async (categoryId) => {
            let ids = [categoryId];
            const subcategories = await Category.findAll({
                where: { parentId: categoryId },
                attributes: ['id']
            });

            for (const sub of subcategories) {
                ids = ids.concat(await getAllSubcategoryIds(sub.id));
            }
            return ids;
        };

        try {
            const categoryIds = await getAllSubcategoryIds(targetCategory.id);
            const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

            const priceFilter = {};
            if (minPrice) priceFilter[Op.gte] = Number(minPrice);
            if (maxPrice) priceFilter[Op.lte] = Number(maxPrice);

            const whereCondition = {
                categoryId: {
                    [Op.in]: categoryIds
                }
            };

            if (minPrice || maxPrice) {
                whereCondition.price = priceFilter;
            }

            const offset = (parseInt(page) - 1) * parseInt(limit);
            const limitValue = parseInt(limit);

            // Toplam ürün sayısını bulalım
            const totalProducts = await Product.count({ where: whereCondition });

            // Ürünleri sorgulayalım
            const products = await Product.findAll({
                where: whereCondition,
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name', 'slug']
                }],
                order: [['price', sort.toLowerCase() === 'desc' ? 'DESC' : 'ASC']],
                offset: offset,
                limit: limitValue
            });

            // Ürünlerin tam URL'lerini oluşturalım
            const productsWithFullUrls = products.map(product => {
                const productJson = product.toJSON();
                productJson.images = productJson.images?.map(image =>
                    `${baseUrl}/${image.replace(/\\/g, '/')}`
                ) || [];
                return productJson;
            });

            // Toplam sayfa sayısını hesaplayalım
            const totalPages = Math.ceil(totalProducts / limitValue);

            // Veriyi döndürelim
            res.status(200).json({
                data: productsWithFullUrls,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: totalPages,
                    totalProducts: totalProducts,
                }
            });
        } catch (error) {
            res.status(500);
            throw new Error(`Error fetching products for category: ${error.message}`);
        }
    }),
};

export default categoryController;