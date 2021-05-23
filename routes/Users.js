// const express = require("express");
// const router = express.Router();
// const User = require("./../models/User");
// // const bodyParser = require('body-parser');

// // get the users from database
// router.get("/", (req, res, next) => {
//   User.find({}).then((User) => {
//     res.send(User);
//   });
// });

// //get single user
// router.get("/:id", (req, res, next) => {
//   User.findById({ _id: req.params.id }).then((User) => {
//     res.send(User);
//   });
// });

// //Add a new user to the Database
// router.post("/", (req, res, next) => {
//   User.create(req.body)
//     .then((User) => {
//       res.send(User);
//     })
//     .catch(next);
// });

// //Update the user in database
// router.put("/:id", (req, res, next) => {
//   User.findByIdAndUpdate({ _id: req.params.id }, req.body).then((User) => {
//     User.findById({ _id: req.params.id }).then((User) => {
//       console.log("USer Updated");
//       res.send(User);
//     });
//   });
// });

//Delete user from the database


// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Get All the Users from Data Base
router.get("/", (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  });
});

//Delete from database
router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete({ _id: req.params.id }).then((User) => {
    res.send(User);
  });
});

//Get Single User
router.get("/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

router.post("/register", (req, res) => {
  const { type, name, email, password, phone, latitude, longitude } = req.body;
  console.log(req.body);
  //Check Simple Validation
  if (!name || !email || !password || !phone || !latitude || !longitude) {
    return res.status(400).json({ msg: "Please Enter All the fields" });

  }

  //Check For Existing User
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User Already Exists" });

    const newUser = new User({
      name,
      email,
      password,
      phone,
      type,
      latitude,
      longitude,
    });

    //Create Salt and Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            "mad_myjwtSecret",
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  type: user.type,
                  latitude: user.latitude,
                  longitude: user.longitude,
                },
              });
            }
          );
        });
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  //Check Simple Validation
  if (!email || !password) {
    //return res.send('Please Enter all the Fields');
    res.status(400).json({ msg: "Please Enter all the fields" });
  }

  //Check For Existing User
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User Doesn't Exist" });

    //Validate Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      jwt.sign(
        { id: user.id },
        "mad_myjwtSecret",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.status(400).json({
              msg: "Invalid credentials",
            });
          }
          return res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              type: user.type,
              latitude: user.latitude,
              longitude: user.longitude,
            },
          });
        }
      );
    });
  });
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then((user) => {
    User.findOne({ _id: req.params.id }).then((user) => {
      res.send(user);
    });
  });
});

//get all mechanics
router.get("/mechs/:id", (req, res, next) => {
  const { id } = req.params;
  User.find({ type: id }).then((User) => {
    res.send(User)
  });

});


module.exports = router;
