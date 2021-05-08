const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  type: {
    type: Number,
    required: [true, "type field is required"],
    default: 2,
  },
  name: {
    type: String,
    required: [true, "name field is required"],
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Emial is required"],
  },

  phone: {
    type: Number,
    required: [true, "Please Enter your phone Number"],
  },

  password: {
    type: String,
    required: [true, "Please Enter your Password"],
  },

  latitude: {
    type: Number,
    required: [true, "Please Enter the Latitude"],
  },

  longitude: {
    type: Number,
    required: [true, "Please Enter the Longitude"],
  },
});

// Auto Generated created at and updated at
UserSchema.set("timestamps", true);

const User = mongoose.model("users", UserSchema);

module.exports = User;
