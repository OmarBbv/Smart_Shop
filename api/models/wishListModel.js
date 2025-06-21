import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB.js';
import User from './userModel.js';
import Product from './productModel.js';

const Wishlist = sequelize.define(
    'Wishlist',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'products', key: 'id' },
        },
    },
    {
        tableName: 'wishlists',
        underscored: true,
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'product_id'],
            },
        ],
    }
);

User.belongsToMany(Product, {
    through: Wishlist,
    foreignKey: 'userId',
    as: 'wishlistProducts',
});

Product.belongsToMany(User, {
    through: Wishlist,
    foreignKey: 'productId',
    as: 'wishlistedByUsers',
});

Wishlist.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
});

Wishlist.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});


export default Wishlist;
