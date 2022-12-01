const router = require('express').Router();
const { Category, Item, User } = require('../../models');

//GET all Categories by Users
router.get('/user', async (req, res) => {
  try {
    const categoryData = await User.findAll({
      include: [{ model: Category }]
    });

    // Return Error Message if no product is found
    if (!categoryData) {
      res.status(404).json({ message: "That User doesn't exist!" });
      return;
    }
    // Else Return Product Object
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET all Categories by 1 User
router.get('/user/:id', async (req, res) => {
  try {
    const categoryData = await User.findByPk(req.params.id, {
      include: [{ model: Category }]
    });

    // Return Error Message if no product is found
    if (!categoryData) {
      res.status(404).json({ message: "That User doesn't exist!" });
      return;
    }
    // Else Return Product Object
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET one categories
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id);

    // Return error if no Category found
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
    }

    // Else Return Category Object
    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );

    // Return categories to handlebars template engine:
    res.render('item', {
      categories,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//CREATE A category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      req.status(404).json({ message: "That Category doesn't exist!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    // Return Error Message if no product is found
    if (!categoryData) {
      res.status(404).json({ message: "That Category doesn't exist!" });
      return;
    }

    // Else Return Product Object
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET one Category with items:
router.get('/items/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Item }]
    });

    // Return Error Message if no product is found
    if (!categoryData) {
      res.status(404).json({ message: "That Category doesn't exist!" });
      return;
    }
    // Else Return Product Object
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
