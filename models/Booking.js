const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  time: {
    type: Date,
    required: [true, "Service Name field is required"],
  },

  latitude: {
    type: Number,
    required: [true, "Please Enter Latitude"],
  },

  longitude: {
    type: Number,
    required: [true, "Please Enter Longitude"],
  },

  service: {
    type: String,
    required: [true, "Please Enter Service Name"],
  },

  userId: {
    type: String,
    required: [true, "Please Enter the UserId"],
  },

  mechanicId: {
    type: String,
    required: [true, "Please Enter the mechanicId"],
  },
});

// Auto Generated created at and updated at
BookingSchema.set("timestamps", true);

const Booking = mongoose.model("bookings", BookingSchema);

module.exports = Booking;
