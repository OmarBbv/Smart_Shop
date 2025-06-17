import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import { Op } from 'sequelize';

const productController = {
    /**
   * @desc    Yeni məhsul əlavə et
   * @route   POST /api/v1/products
   * @access  Private/Admin
   * @info    form-data upload.array('images')
   */
    createProduct: asyncHandler(async (req, res) => {
        const { name, price, categoryId, description, credit_available } = req.body;

        if (!name || !price || !categoryId) {
            return res.status(400).json({ success: false, message: "Məcburi sahələr yoxdur" });
        }

        const imagesFile = req.files ? req.files.map(file => file.path) : [];

        let parsedFeatures = {};
        try {
            parsedFeatures =
                typeof req.body.features === 'string'
                    ? JSON.parse(req.body.features)
                    : req.body.features || {};
        } catch (err) {
            return res.status(400).json({ success: false, message: "Features JSON formatında deyil" });
        }

        const newProduct = await Product.create({
            name,
            price,
            description,
            categoryId,
            credit_available,
            features: parsedFeatures,
            images: imagesFile,
        });

        res.status(201).json({
            message: 'Məhsul uğurla əlavə edildi.',
            success: true,
            data: newProduct,
        });
    }),

    // createProduct: asyncHandler(async (req, res) => {
    //     try {
    //         const { name, price, categoryId, description, credit_available } = req.body;

    //         if (!name || !price || !categoryId) {
    //             return res.status(400).json({ success: false, message: "Məcburi sahələr yoxdur" });
    //         }

    //         const imagesFile = req.files ? req.files.map(file => file.path) : [];

    //         let parsedFeatures = {};
    //         try {
    //             parsedFeatures =
    //                 typeof req.body.features === 'string'
    //                     ? JSON.parse(req.body.features)
    //                     : req.body.features || {};
    //         } catch (err) {
    //             return res.status(400).json({ success: false, message: "Features JSON formatında deyil" });
    //         }

    //         const newProduct = await Product.create({
    //             name,
    //             price,
    //             description,
    //             categoryId,
    //             credit_available,
    //             features: parsedFeatures,
    //             images: imagesFile,
    //         });

    //         res.status(201).json({
    //             message: 'Məhsul uğurla əlavə edildi.',
    //             success: true,
    //             data: newProduct,
    //         });
    //     } catch (error) {
    //         console.error('Product creation error:', error);
    //         res.status(500).json({
    //             success: false,
    //             message: 'Server xətası. Məhsul əlavə edilərkən xəta baş verdi.',
    //             error: error.message,
    //             stack: error.stack,
    //         });
    //     }
    // }),


    /**
  * @desc    Məhsulu yeniləmək
  * @route   PUT /api/v1/products/{identity}
  * @access  Private/Admin
  * @info    form-data upload.array('images')
  */
    updateProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { name, price, categoryId, features, description, credit_available } = req.body;

        const product = await Product.findByPk(id, {
            include: [{ model: Category, as: 'category' }]
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Məhsul tapılmadı',
            });
        }

        if (features) {
            let parsedFeatures = {};
            try {
                parsedFeatures =
                    typeof features === 'string'
                        ? JSON.parse(features)
                        : features || {};

                product.features = {
                    ...product.features,
                    ...parsedFeatures,
                };
            } catch (err) {
                res.status(400);
                throw new Error("Features JSON formatında deyil");
            }
        }

        if (req.files && req.files.length > 0) {
            const imagesFile = req.files.map(file => file.path);
            product.images = imagesFile;
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.categoryId = categoryId || product.categoryId;
        product.description = description || product.description;
        product.credit_available = credit_available || product.credit_available

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: 'Məhsul uğurla yeniləndi.',
            data: updatedProduct,
        });
    }),

    /**
    * @desc   Məhsulu silmək
    * @route  DELETE /api/v1/products/{identity}
    * @access Private/Admin
    */
    deleteProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;

        const findProduct = await Product.findByPk(id);
        if (!findProduct) {
            res.status(404).json({
                success: false,
                message: 'Məhsul tapılmadı'
            })
        }

        await findProduct.destroy();

        res.status(200).json({
            success: true,
            message: 'Məhsul uğurla silindi',
        });
    }),

    /**
     * @desc    Bütün məhsulları əldə et və filtrə et
     * @route   GET /api/v1/products
     * @access  Public
     */
    getAllProducts: asyncHandler(async (req, res) => {
        const { minPrice, maxPrice, page = 1 } = req.query;

        const where = {};

        if (minPrice) {
            where.price = {
                ...(where.price || {}),
                [Op.gte]: Number(minPrice),
            };
        }

        if (maxPrice) {
            where.price = {
                ...(where.price || {}),
                [Op.lte]: Number(maxPrice),
            };
        }

        const limit = 30;
        const offset = (Number(page) - 1) * limit;

        const { rows: products, count: total } = await Product.findAndCountAll({
            where,
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

        const productsWithFullUrls = products.map(product => ({
            ...product.toJSON(),
            images: product.images?.map(image =>
                `${baseUrl}/${image.replace(/\\/g, '/')}`
            ) || []
        }));

        res.status(200).json({
            success: true,
            message: 'Bütün məhsullar gətirildi',
            data: productsWithFullUrls,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
            },
        });
    }),


    /**
  * @desc    Bir məhsulları gətir
  * @route   GET /api/v1/products/{id}
  * @access  Public
  */
    getProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;

        const findProduct = await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name', 'slug'],
                },
            ],
        });

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: 'Məhsul tapılmadı'
            })
        }

        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

        const productWithFullUrls = {
            ...findProduct.toJSON(),
            images: findProduct.images?.map(image =>
                `${baseUrl}/${image.replace(/\\/g, '/')}`
            ) || []
        };

        res.status(200).json({
            success: true,
            message: 'Məhsul gətirildi',
            data: productWithFullUrls
        })
    }),

};

export default productController;