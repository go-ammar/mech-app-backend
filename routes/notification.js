const express = require("express");
const router = express.Router();
const gcm = require("node-gcm");
const Notifications = require("./../models/Notifications");


var sender = new gcm.Sender(
  "AAAA71p0hGQ:APA91bHdT4Huz9V3_pf_nFtsqbA-hsafXFyjDqAZqYnZ4gmoXyEkE4mBOafm4He9Q2Jie_HPNiOH1vC5mEepxtvibm7XFLaoeMvAQD_HRyCWhlD-B0RlleXilxiFANE8GhKSsW6In8_c"
);

router.post("/register-device", (req, res) => {
  const { deviceToken, userId } = req.body;

  Notifications.create(req.body)
  .then((Notifications) => {
    res.send(Notifications);
  })
  .catch(next);
  // save the record in your database
});

router.post("/send-notification", (req, res) => {
  sendNotificationAndroid({ title: req.body.title, body: req.body.body }, [
    "fIRx8dnvSISwvgvYXJ_LsB:APA91bFZsp1w7O299yFDWR-hNMEZ1l1RMQRG-O98jYOlg3EOo6Z01uTd31nbd7bk15sPKLUDxVgMQc0kgQ63thhrcDnleZM87FtznbJTNZYOUCAu0sFttghIzKo810JSmqg6npf0RGg7",
  ]);
  res.json("ok");
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
