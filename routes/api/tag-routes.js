const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product
      }
    ]
  })
  .then((tagData) => res.status(200).json(tagData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then((tagData) => res.status(200).json(tagData))
  .catch((err)=> {
    console.log(err);
    res.status(400).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((tagData) => res.status(200).json(tagData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
  })
  .then((tagData) => res.status(200).json(tagData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
    where: req.params.id
  })
  .then(tagData => {
    if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
      res.json(tagData);
  })
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;
