const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product],
  })
    .then((tags) => res.json(tags))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Tag.findByPk(req.params.id, {
      include: [Product], 
    })
    .then((tag) => res.json(tag))
    .catch((err) => {
      console.error(err); 
      res.status(500).json(err);
    });
  });
  
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((Tag) => res.status(200).json(Tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
    Tag.update(req.body, {
        where: {
        id: req.params.id,
        },
    })
        .then((Tag) => res.status(200).json(Tag))
        .catch((err) => {
        console.log(err);
        res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
        id: req.params.id,
        },
    })
        .then((Tag) => res.status(200).json(Tag))
        .catch((err) => {
        console.log(err);
        res.status(400).json(err);
        });
});

module.exports = router;
