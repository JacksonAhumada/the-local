const sequelize = require('../config/connection');

const { User, Category, Item } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true
  });

  await Item.bulkCreate(itemData, {
    individualHooks: true,
    returning: true
  });

  process.exit(0);
};

seedDatabase();
