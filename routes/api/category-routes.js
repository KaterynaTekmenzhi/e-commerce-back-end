const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET `/api/categories`
// This route should be used to retrieve all categories
// METHOD: GET
router.get('/', async (req, res) => {
	const categoryData = await Category.findAll({ include: { model: Product } });

	if (!categoryData) {
		res.status(404).json({ message: 'No categories found' });
	}
	res.json(categoryData);

});

// GET `/api/categories/:id`
// This route should be used to retrieve a single category
// METHOD: GET
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: {
        model: Product
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: 'Error getting category' });
  }
});

// POST `/api/categories`
// This route should be used to create a new category
// METHOD: POST
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(category => {
      res.status(201).json(category);
    }) 
    .catch(err => { 
      res.status(500).json({ message: 'Error creating category' });
    }); 
});

// PUT `/api/categories/:id`
// This route should be used to update a category
// METHOD: PUT
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    req.body,
    { where: { id: req.params.id } }
  )
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating category' });
    });
});

// DELETE `/api/categories/:id`
// This route should be used to delete a category
// METHOD: DELETE
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(
      { where: { id: req.params.id } }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category' });
  }
});

module.exports = router;
