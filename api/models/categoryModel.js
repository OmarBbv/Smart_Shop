import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-');     
}

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'categories',
  underscored: true
});

// 🔥 Slug yaratmaq üçün hook
Category.addHook('beforeValidate', async (category) => {
  if (!category.slug && category.name) {
    category.slug = slugify(category.name);
  }
});


// İlişkilər
Category.belongsTo(Category, {
  as: 'parent',
  foreignKey: 'parentId'
});

Category.hasMany(Category, {
  as: 'subcategories',
  foreignKey: 'parentId'
});

Category.prototype.getSubcategoriesRecursive = async function () {
  const subcategories = await Category.findAll({
    where: { parentId: this.id },
    include: [{
      model: Category,
      as: 'subcategories'
    }]
  });

  return subcategories;
};

export default Category;
