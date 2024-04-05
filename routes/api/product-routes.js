const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  Product.findAll({
    include: [Category, Tag],
  })
    .then((Products) => res.json(Products))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Product.findAll({
    where: {
      id: req.params.id,
    },
    include: [Category, Tag],
  })
    .then((Product) => res.json(Product))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
    console.log("Received request body:", req.body);

    const { tagIds, ...ProductData } = req.body;
    console.log("Extracted Product data:", ProductData);
    console.log("Extracted tag IDs:", tagIds);

    Product.create(ProductData)
        .then((Product) => {
            console.log("Product created successfully:", Product);
            if (tagIds && tagIds.length) {
                const ProductTagIdArr = tagIds.map((tag_id) => {
                    return {
                        Product_id: Product.id,
                        tag_id,
                    };
                });
                console.log("Creating Product tags:", ProductTagIdArr);
                return ProductTag.bulkCreate(ProductTagIdArr).then(() => {
                    console.log("Product tags created successfully.");
                    return Product; 
                });
            }
            return Product; 
        })
        .then((ProductOrTagIds) => {
            console.log("Final response being sent:", ProductOrTagIds);
            res.status(200).json(ProductOrTagIds);
        })
        .catch((err) => {
            console.error("Error during Product creation or tag association:", err);
            res.status(400).json(err);
        });
});


router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { Product_id: req.params.id }
        }).then((ProductTags) => {
          const ProductTagIds = ProductTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !ProductTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              Product_id: req.params.id,
              tag_id,
            };
          });

          const ProductTagsToRemove = ProductTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
          return Promise.all([
            ProductTag.destroy({ where: { id: ProductTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(Product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
        id: req.params.id,
        },
    })
        .then((Product) => res.json(Product))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

module.exports = router;
