const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  console.log("\n----------------------");
  console.log("Request Made by Ip: " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  console.log("-------All Tags------");
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
      include: {
        model: Product
      }
    }
  )
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  console.log("\n----------------------");
  console.log("Request Made by Ip: " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  console.log("-------Tag By Id: " + req.params.id + "------");
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(tagData => {
      if (!tagData) {
        console.log('********No Tag found with ID:' + req.params.id + `********`);
        res.status(404).json({ message: 'No Tag found with ID:' + req.params.id });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  console.log("\n----------------------");
  console.log("Request Made by Ip: " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagData =>  {
      console.log("-------New Tag Name: " + req.body.tag_name + "  ID: " + tagData.dataValues.id + "-------");
      res.json(tagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  console.log("\n----------------------");
  console.log("Request Made by Ip: " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  console.log("-------Tag Name Updated " + " ID: " + req.params.id + " New Name " + req.body.tag_name + "-------");
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => { 
      let affectedrow = tagData[0]
      if (affectedrow === 0 ) {
        console.log('**ERROR NOT UPDATED** No Tag found with ID:' + req.params.id + '  Or Name already taken: ' + req.body.tag_name );
        res.status(404).json({ message: '**ERROR NOT UPDATED** No Tag found with ID:' + req.params.id + '  Or Name already taken: ' + req.body.tag_name });
        return;
      }
      console.log("***Tag Name Updated: " + " ID: " + req.params.id + " New Name: " + req.body.tag_name );
      res.json("Tag Name Updated: " + " ID: " + req.params.id + " New Name: " + req.body.tag_name + ' Affected Rows:  ' + tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  console.log("\n----------------------");
  console.log("Request Made by Ip: " + req.socket.remoteAddress);
  console.log("Requested Url:", req.method + " " + req.originalUrl);
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found by that ID.' });
        console.log('***No Tag Found With that ID: ' + req.params.id)
        return;}
        else {
          console.log("****Tag Successfully Deleted With ID: " + req.params.id)
      }
      res.json("****Tag Successfully Deleted With ID: " + req.params.id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
