// import models
const User = require('./User');
const Category = require('./Category');
const Item = require('./Item');

// Products belongsTo Category
Item.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Item, {
  foreignKey: 'category_id'
});

module.exports = {
  User,
  Category,
  Item
};
