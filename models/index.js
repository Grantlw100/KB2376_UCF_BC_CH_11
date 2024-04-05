// import models
const Product = require('./Product');
const Category = require('./Category');
const ProductTag = require('./ProductTag');
Tag = require('./tag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'Product_id',
});

Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id',
    });

ProductTag.belongsTo(Product, {
  foreignKey: 'Product_id',
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
