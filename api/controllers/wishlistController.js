import asyncHandler from 'express-async-handler';
import Wishlist from '../models/wishListModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const wishlistController = {
    /**
  * @desc    Bir məhsulu seçilmişlərə əlavə et və ya çıxart (toggle)
  * @route   POST /api/v1/wishlist/:id
  * @access  Private/User
  * @info    User ID from JWT token
  */
    addToWishlist: asyncHandler(async (req, res) => {
        const productId = req.params.id;
        const userId = req.user.id;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Məhsul tapılmadı.' });
        }

        const existingWishlistItem = await Wishlist.findOne({
            where: { userId, productId },
        });

        if (existingWishlistItem) {
            await existingWishlistItem.destroy();
            return res.status(200).json({
                message: 'Məhsul seçilmişlərdən çıxarıldı.',
                removed: true,
            });
        }

        const newWishlistItem = await Wishlist.create({ userId, productId });
        return res.status(201).json({
            message: 'Məhsul seçilmişlərə əlavə edildi.',
            wishlistItem: newWishlistItem,
            added: true,
        });
    }),


    /**
     * @desc    Seçilmişlərdən məhsulu sil
     * @route   DELETE /api/v1/wishlist/:id
     * @access  Private/User
     */
    removeFromWishlist: asyncHandler(async (req, res) => {
        const productId = req.params.id;
        const userId = req.user.id;

        const deleted = await Wishlist.destroy({
            where: { userId, productId },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Məhsul seçilmişlərdə tapılmadı.' });
        }

        return res.status(200).json({ message: 'Məhsul seçilmişlərdən silindi.' });
    }),

    /**
   * @desc    Kullanıcının tüm seçilmiş ürünlerini getir
   * @route   GET /api/v1/wishlist
   * @access  Private/User
   */
    getAllWishlistItems: asyncHandler(async (req, res) => {
        const userId = req.user.id;


        const wishlistItems = await Wishlist.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    as: 'product',
                    include: [
                        {
                            model: Category,
                            as: 'category',
                            attributes: ['name'],
                        }
                    ]
                }
            ]
        });
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

        const formattedWishlist = wishlistItems.map(item => {
            const product = item.product;

            return {
                ...item.toJSON(),
                product: {
                    ...product.toJSON(),
                    images: product.images?.map(image =>
                        `${baseUrl}/${image.replace(/\\/g, '/')}`
                    ) || []
                }
            };
        });

        res.status(200).json({
            success: true,
            message: 'Seçilmiş məhsullar gətirildi',
            data: formattedWishlist
        });
    }),

};

export default wishlistController;
