const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//setup express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//connect to mongo db
mongoose.connect(
  "mongodb+srv://go_ammar:desert123@cluster0.ukbzl.mongodb.net/FYPDatabase?retryWrites=true&w=majority",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: 1,
  }
);

mongoose.Promise = global.Promise;

// app.use(express.json());

//Initializing routes
app.use("/api/users", require("./routes/Users"));
app.use("/api/services", require("./routes/Services"));
app.use("/api/bookings", require("./routes/Bookings"));
app.use("/api/notifications", require("./routes/notification"));

//error handling middleware
app.use((err, req, res, next) => {
  res.send(err.message);
});

//starting server
app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
