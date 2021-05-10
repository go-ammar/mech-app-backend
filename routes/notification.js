const express = require("express");
const router = express.Router();
const gcm = require("node-gcm");
const Notifications = require("./../models/Notifications");

var sender = new gcm.Sender(
  "AAAA71p0hGQ:APA91bHdT4Huz9V3_pf_nFtsqbA-hsafXFyjDqAZqYnZ4gmoXyEkE4mBOafm4He9Q2Jie_HPNiOH1vC5mEepxtvibm7XFLaoeMvAQD_HRyCWhlD-B0RlleXilxiFANE8GhKSsW6In8_c"
);

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
  // var token = req.body.token.toString();

  Notifications.find({}).then((notifs) => {
    res.send(notifs);
  });

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

module.exports = router;
