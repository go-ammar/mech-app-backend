const express = require("express");
const router = express.Router();
const Booking = require("./../models/Booking");
// const bodyParser = require('body-parser');

// get the Booking from database
router.get("/", (req, res, next) => {
  Booking.find({}).then((Bookings) => {
    res.send(Bookings);
  });
});

//get single Booking
router.get("/:id", (req, res, next) => {
  Booking.findById({ _id: req.params.id }).then((Booking) => {
    res.send(Booking);
  });
});

//Add a new Booking to the Database
router.post("/", (req, res, next) => {
  Booking.create(req.body)
    .then((Booking) => {
      res.send(Booking);
    })
    .catch(next);
});

//Update the Booking in database
router.put("/:id", (req, res, next) => {
  Booking.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    (Booking) => {
      Booking.findById({ _id: req.params.id }).then((Booking) => {
        console.log("Booking Updated");
        res.send(Booking);
      });
    }
  );
});

//Delete Booking from the database
router.delete("/:id", (req, res, next) => {
  Booking.findByIdAndDelete({ _id: req.params.id }).then((Booking) => {
    res.send(Booking);
  });
});

module.exports = router;
