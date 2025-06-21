import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB.js';
import Category from '../models/categoryModel.js';

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'categories', key: 'id' },
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    credit_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    /* ---- Dinamik özellikler (Map) ---- */
    features: {
      /**
       * JSONB sayesinde her ürüne özel key‑value çiftleri ekleyebilirsin.
       * Örn. {"ram":"16GB","battery":"5000mAh"}
       */
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}, // boş obje ile başlat
    },
  },
  {
    tableName: 'products',
    underscored: true,
    timestamps: true,
  }
);

/* İlişkiler */
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category', onDelete: 'CASCADE' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

export default Product;