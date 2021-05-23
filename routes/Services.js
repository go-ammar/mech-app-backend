const express = require("express");
const router = express.Router();
const Service = require("./../models/Service");
// const bodyParser = require('body-parser');

// get the service from database
router.get("/", (req, res, next) => {
  Service.find({}).then((Services) => {
    res.send(Services);
  });
});

//get single service
router.get("/:id", (req, res, next) => {
  Service.findById({ _id: req.params.id }).then((Service) => {
    res.send(Service);
  });
});

//Add a new service to the Database
router.post("/", (req, res, next) => {
  Service.create(req.body)
    .then((Service) => {
      res.send(Service);
    })
    .catch(next);
});

//Update the service in database
router.put("/:id", (req, res, next) => {
  Service.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    (Service) => {
      Service.findById({ _id: req.params.id }).then((Service) => {
        console.log("Service Updated");
        res.send(Service);
      });
    }
  );
});

//Delete service from the database
router.delete("/:id", (req, res, next) => {
  Service.findByIdAndDelete({ _id: req.params.id }).then((Service) => {
    res.send(Service);
  });
});

//get Service by mechanic id
router.get("/services_by_id/:id", (req, res, next) => {
  const { id } = req.params;
  Service.find({ mechanic: id }).then((Service) => {
    res.json({ Service })
  });

});

module.exports = router;
