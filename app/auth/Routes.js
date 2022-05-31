var express = require("express");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/signup", function (req, res) {
  res.send("registrate");
});

router.get("/login", function (req, res) {
  res.send("ingresa");
});
// define the about route
router.get("/resetPassword", function (req, res) {
  res.send("nueva cotraseña");
});

module.exports = router;
