const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
// GET `/api/tags`
// METHOD: GET
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include:
        { model: Product }
    });
    console.log(tags);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Error getting tags' });
  }
});

// get one tag
// GET `/api/tags/:id`
// METHOD: GET
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagName = req.params.id;
    const tag = await Tag.findByPk(tagName, {
      include:
        { model: Product }
    });

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Error getting tag' });
  }
});

// create new tag
// POST `/api/tags`
// METHOD: POST
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);

    if (!tag) {
      res.status(400).json({ message: 'Error creating tag' });
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Error creating tag' });
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
