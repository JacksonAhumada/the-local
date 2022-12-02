// import models
const User = require('./User');
const Category = require('./Category');
const Item = require('./Item');

User.hasMany(Category, {
  foreignKey: "user_id",
});

Category.belongsTo(User, {
  foreignKey: "user_id",
});

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
