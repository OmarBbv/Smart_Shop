import { DataTypes } from "sequelize"
import { sequelize } from "../configs/connectDB.js"
import Product from "./productModel.js"

const Hero = sequelize.define('Hero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'products',
            key: 'id',
        },
    },
}, {
    tableName: 'heros',
    underscored: true,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['product_id'],
        },
    ],
})

Hero.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Product.hasOne(Hero, { foreignKey: 'productId', as: 'heroBanner' });


export default Hero


