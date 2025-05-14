import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB.js';
import UserTable from './userModel.js'; 

const AuthTable = sequelize.define('Auth', {
    userId: {
        type: DataTypes.UUID,
        references: {
            model: UserTable,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastLogin: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
    tableName: 'Auths',
});

// AuthTable modeline şifre doğrulama fonksiyonu ekleyelim
AuthTable.prototype.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;  // Doğrudan şifre karşılaştırması
};

// AuthTable modelinin UserTable ile ilişkisini belirtmek
AuthTable.belongsTo(UserTable, { foreignKey: 'userId' });

// UserTable modelinin AuthTable ile olan ilişkisini belirtmek
UserTable.hasOne(AuthTable, { foreignKey: 'userId' });

export default AuthTable;
