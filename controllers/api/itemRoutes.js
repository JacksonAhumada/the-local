const router = require('express').Router();
const { Item, Category } = require('../../models');

// The `/api/items` endpoint

// GET all items
router.get('/', async (req, res) => {
  try {
    const itemData = await Item.findAll(
      // return item and category
      {
        include: [{ model: Category }]
      }
    );
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a item
router.get('/:id', async (req, res) => {
  try {
    // find a single item by its `id`
    const itemData = await Item.findByPk(
      req.params.id,
      // return item and category
      {
        include: [{ model: Category }]
      }
    );

    // Return Error Message if no item is found
    if (!itemData) {
      res.status(404).json({ message: 'No item found with this id!' });
      return;
    }
    // Else Return item Object
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new item
router.post('/', async (req, res) => {
  /* req.body payload in insomnai should look like this...
    {
      "item_name": "Red Rocks",
      "website": "www.redrocks.com",
      "category_id": 1
    }
  */
  try {
    const itemData = await Item.create(req.body);
    res.status(200).json(itemData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE an item by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const itemData = await Item.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!itemData) {
      req.status(404).json({ message: "That Item doesn't exist!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a item by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id
      }
    });

    // Return Error Message if no item is found
    if (!itemData) {
      res.status(404).json({ message: "That Item doesn't exist!" });
      return;
    }

    // Else Return Item Object
    res.status(200).json(itemData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
