// import models
const User = require('./User');
const Category = require('./Category');
const Item = require('./Item');

// Categories have many Products
Category.hasMany(Item, {
  foreignKey: 'category_id'
});

// Items belongsTo Category
Item.belongsTo(Category, {
  foreignKey: 'category_id'
});

module.exports = {
  User,
  Category,
  Item
};
