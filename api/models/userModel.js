import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB.js';

const UserTable = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // 0: ghost, 1: user, 2: admin
        validate: {
            isIn: [[0, 1, 2]],
        },
    },
}, {
    timestamps: true,
    tableName: 'Users',
})

export default UserTable