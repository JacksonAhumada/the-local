const router = require('express').Router();
const { Category, Item } = require('../models');
const withAuth = require('../utils/auth');

//GET one Category with items:
router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {
      // include all Items for that Category
      include: [{ model: Item }]
    });

    if (!categoryData) {
      console.log('Not Found');
      return;
    }
    // Store Category & Items json as an object that can be parsed
    const category = categoryData.get({ plain: true });

    // Return category object to handlebars template engine:
    res.render('item', {
      category,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(500).json(error);
  }
}); 

module.exports = router;
