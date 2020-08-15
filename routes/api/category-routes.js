const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      Product
    ]
  })
  .then((categoryData) => res.status(200).json(categoryData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

  // find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then((categoryData) => res.status(200).json(categoryData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

// creates a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then((categoryData) => res.status(200).json(categoryData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {

  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then((categoryData) => res.status(200).json(categoryData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

// delete a category
router.delete('/:id', (req, res) => {
  // delete a parent products by category `id` value
  Product.destroy({
    where: {
      category_id: req.params.id
    }
  // delete a category by its `id` value
  }).then(() => {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(categoryData => {
      if (!categoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
      }
        res.json(categoryData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  })
});

module.exports = router;
