const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  service_name: {
    type: String,
    required: [true, "Service Name field is required"],
  },

  price: {
    type: Number,
    required: [true, "Please Enter Service Price"],
  },

  vehicle_type: {
    type: String,
    required: [true, "Please Enter Vehicle Type"],
  },

  mechanic: {
    type: String,
    required: [true, "Please Enter the Mechanic Name"],
  },
});

// Auto Generated created at and updated at
ServiceSchema.set("timestamps", true);

const Service = mongoose.model("services", ServiceSchema);

module.exports = Service;
