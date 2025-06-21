import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Hero from '../models/heroModel.js';

const heroController = {
    /**
     * @desc    Məhsulları hero bannerə əlavə et
     * @route   POST /api/v1/heros/:id
     * @access  Private/Admin
     */
    createHeroBanner: expressAsyncHandler(async (req, res) => {
        const { id } = req.params;
        const { description } = req.body;

        const existingProduct = await Product.findByPk(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Məhsul silinmiş yada dəyişdirilmiş olabilər.'
            });
        }

        const existingHero = await Hero.findOne({ where: { productId: id } });

        if (existingHero) {
            return res.status(400).json({
                success: false,
                message: 'Bu məhsul artıq Hero banner kimi əlavə edilib.'
            });
        }

        const heroCount = await Hero.count();

        if (heroCount >= 2) {
            return res.status(400).json({
                success: false,
                message: 'Hero banner sayısı maksimuma çatıb.'
            });
        }

        const newHero = await Hero.create({
            productId: id,
            description: description
        });

        res.status(201).json({
            success: true,
            message: 'Məhsul Hero banner kimi əlavə edildi.',
            data: newHero
        });
    }),


    /**
     * @desc    Məhsulları hero bannerdən silmək
     * @route   DELETE /api/v1/heros/:id
     * @access  Private/Admin
     */
    deleteHeroBanner: expressAsyncHandler(async (req, res) => {
        const { id } = req.params;

        const existingHeroProduct = await Hero.findByPk(id);

        if (!existingHeroProduct) {
            return res.status(404).json({
                success: false,
                message: 'Bannerdən məhsul çıxarılıb yada tapılmadı.'
            });
        }

        await Hero.destroy({ where: { id } });  // ID ile silme yapılmalı

        res.status(200).json({
            success: true, // Silme başarılıysa success true olmalı
            message: 'Məhsul uğurla banner siyahısından çıxarıldı.'
        });
    }),

    /**
     * @desc    Bütün məhsulları gətirmək
     * @route   GET /api/v1/heros
     * @access  Public/Users
     */
    getAllHeroProduct: expressAsyncHandler(async (req, res) => {
        const heroProdCount = await Hero.count();

        if (heroProdCount <= 0) {
            return res.status(200).json({
                success: true,
                message: 'Bannerə əlavə edilən məhsul yoxdur.'
            });
        }

        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

        const heros = await Hero.findAll({
            include: [
                {
                    model: Product,
                    as: 'product'
                }
            ]
        });

        // Görsel yollarını tam URL'ye dönüştür
        const herosWithFullImageUrls = heros.map(hero => {
            const product = hero.product?.toJSON();

            return {
                ...hero.toJSON(),
                product: {
                    ...product,
                    images: product?.images?.map(image => `${baseUrl}/${image.replace(/\\/g, "/")}`) || []
                }
            };
        });

        return res.status(200).json({
            success: true,
            message: 'Banner məhsulları gətirildi.',
            data: herosWithFullImageUrls
        });
    }),


    /**
     * @desc    Məhsulları editləmək
     * @route   PATCH /api/v1/heros/:id
     * @access  Private/Admin
     */
    getUpdateHeroProd: expressAsyncHandler(async (req, res) => {
        const { id } = req.params;
        const { newProductId, description } = req.body;

        const heroRecord = await Hero.findByPk(id);

        if (!heroRecord) {
            return res.status(404).json({
                success: false,
                message: 'Hero banner tapılmadı.'
            });
        }

        if (newProductId) {
            const newProduct = await Product.findByPk(newProductId);

            if (!newProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Yeni məhsul tapılmadı.'
                });
            }

            const isAlreadyHero = await Hero.findOne({
                where: { productId: newProductId }
            });

            if (isAlreadyHero && isAlreadyHero.id !== heroRecord.id) {
                return res.status(400).json({
                    success: false,
                    message: 'Bu məhsul artıq Hero bannerə əlavə olunub.'
                });
            }

            heroRecord.productId = newProductId;
        }

        if (description !== undefined) {
            heroRecord.description = description;
        }

        await heroRecord.save();

        res.status(200).json({
            success: true,
            message: 'Hero banner uğurla güncelləndi.',
            data: heroRecord
        });
    }),

    /**
     * @desc    Bütün məhsulları silmək
     * @route   DELETE /api/v1/heros/
     * @access  Private/Admin
     */
    deleteAllHeroProducts: expressAsyncHandler(async (req, res) => {
        const deletedCount = await Hero.destroy({ where: {}, truncate: true });

        res.status(200).json({
            success: true,
            message: `${deletedCount} ədəd hero məhsulu uğurla silindi.`,
        });
    }),

}

export default heroController;
