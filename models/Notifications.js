const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  device_token: {
    type: String,
    required: [true, "Device token field is required"],
  },

  user_id: {
    type: String,
    required: [true, "Please Enter userID"],
  }
});

// Auto Generated created at and updated at
NotificationSchema.set("timestamps", true);

const Notifcation = mongoose.model("notification", NotificationSchema);

module.exports = Notifcation;
