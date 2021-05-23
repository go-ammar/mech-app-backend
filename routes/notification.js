const express = require("express");
const router = express.Router();
const gcm = require("node-gcm");
const Notifications = require("./../models/Notifications");

router.post("/register-device", (req, res, next) => {
  Notifications.create(req.body)
    .then((Notifications) => {
      res.send(Notifications);
    })
    .catch(next);
  // save the record in your database
});

router.get("/getUsers", (req, res) => {
  Notifications.find({}).then((tokens) => {
    res.send(tokens);
  });
});

router.post("/send-notification", (req, res, error) => {
  var firebaseDeviceTokens = [];
  firebaseDeviceTokens = req.body.tokens;

  sendNotificationAndroid(
    { title: req.body.title, body: req.body.body },
    firebaseDeviceTokens
  );
  res.json(firebaseDeviceTokens);
});

sendNotificationAndroid = (msg, devicesIds) => {
  const message = new gcm.Message({
    // notification:{ title:"new message" , body:"hey mina"},
    data: {
      ...msg,
    },
  });

  // Specify which registration IDs to deliver the message to
  // var regTokens = ['elE6mbp1ORHw4o_BHcuncn:APA91bG8um-W6yTU7wzz_kwt7J7pothl48To4ac3OE_kOs08PmoYOjRxFP_68Z7dWlGlztoUNiwN3A6RRPT4-LnPz7pfTY9OtyUk3XGa8eYhiVGpeC_LV-mB6wruAjj6pbuaU8ELIVPc'];

  var sender = new gcm.Sender(
    "AAAAVLwPkVw:APA91bHanPCA7UiC6INVhzEtF6f_jtsBTyBO8Vrk7VHJRzsNDNzj21Lt1UmdtHZJtxCjbO-iTP8s2OYEXytICQddkKvfIqZU4ZP-n6EWd8Y6LMeNFPt0r4dWmqajinUJsKbBwKiNoCx-"
  );

  // Actually send the message
  sender.send(
    message,
    { registrationTokens: devicesIds },
    function (err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(response);
      }
    }
  );
};


//update token by user_id
router.put("/:id", (req, res, next) => {
  console.log("Enpoint working");
  Notifications.findOneAndUpdate({ user_id: req.params }, { $set: { device_token: req.body } },
    null, function (err) {
      if (err) {
        console.log(err)
      }
    }).then((Notifications) => {
      res.send(Notifications)
    });
});

//get notifications by mechanic id
router.get("/notification_user/:id", (req, res, next) => {
  const { id } = req.params;
  Notifications.find({ user_id: id }).then((Notifications) => {
    res.send(Notifications)
  });

});

//Delete notifications from the database
router.delete("/:id", (req, res, next) => {
  Notifications.findByIdAndDelete({ user_id: req.params.id }).then((Notifications) => {
    res.send(Notifications);
  });
});


module.exports = router;
