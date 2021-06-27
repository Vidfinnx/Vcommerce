const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
  console.log("++++++");
  console.log("Invalid Request Made by " + req.socket.remoteAddress);
  console.log ("Invalid Requested Url:", req.method + " " + req.url);
  console.log("++++++");

});

module.exports = router;