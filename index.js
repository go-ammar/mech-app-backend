const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//setup express app
const app = express();

app.use(cors());

//connect to mongo db
mongoose.connect("mongodb://localhost/mechanic_app", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  keepAlive: 1,
});

mongoose.Promise = global.Promise;

app.use(express.json());

//Initializing routes
app.use("/api/users", require("./routes/Users"));
app.use("/api/services", require("./routes/Services"));
app.use("/api/bookings", require("./routes/Bookings"));

//error handling middleware
app.use((err, req, res, next) => {
  res.send(err.message);
});

//starting server
app.listen(process.env.port || 4000, () => {
  console.log("server started");
});
