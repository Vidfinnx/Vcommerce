const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log("\n----------------------");
  console.log("Request Made by " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  console.log("-------All Categories------");
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  console.log("\n----------------------");
  console.log("Request Made by " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  console.log("-------Category By Id: " + req.params.id + "------");

  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        console.log('********No Category found with ID:' + req.params.id + `********`);
        res.status(404).json({ message: 'No Category found with ID:' + req.params.id });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  console.log("\n----------------------");
  console.log("Request Made by " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  console.log("-------New Category Name: " + req.body.category_name + "------");
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  console.log("\n----------------------");
  console.log("Request Made by " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  console.log("-------Category Name Updated " + " ID: " + req.params.id + " New Name " + req.body.category_name + "-------");
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(categoryData => {
      if (categoryData) {
        console.log('******** ERROR NOT UPDATED No Category found with ID:' + req.params.id + `********`);
        res.status(404).json({ message: '**ERROR NOT UPDATED** No Category found with ID:' + req.params.id });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No Category found with that ID.' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
