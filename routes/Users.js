const express = require("express");
const router = express.Router();
const User = require("./../models/User");
// const bodyParser = require('body-parser');

// get the users from database
router.get("/", (req, res, next) => {
  User.find({}).then((User) => {
    res.send(User);
  });
});

//get single user
router.get("/:id", (req, res, next) => {
  User.findById({ _id: req.params.id }).then((User) => {
    res.send(User);
  });
});

//Add a new user to the Database
router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((User) => {
      res.send(User);
    })
    .catch(next);
});

//Update the user in database
router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then((User) => {
    User.findById({ _id: req.params.id }).then((User) => {
      console.log("USer Updated");
      res.send(User);
    });
  });
});

//Delete user from the database
router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete({ _id: req.params.id }).then((User) => {
    res.send(User);
  });
});

module.exports = router;
