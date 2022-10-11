const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const schoolsRouter = require("./routes/schools");
const childsRouter = require("./routes/childs");
const foodVendorRouter = require("./routes/foodVendor");
const deliveryVendorRouter = require("./routes/deliveryVendor");
const foodItemsRouter = require("./routes/foodItems");

require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/schools", schoolsRouter);
app.use("/api/childs", childsRouter);
app.use("/api/foodVendor", foodVendorRouter);
app.use("/api/deliveryVendor", deliveryVendorRouter);
app.use("/api/foodItems", foodItemsRouter);

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/./views/index.html");
  res.send({ message: "Welcome to API Server" });
});
//invalid route
app.use((req, res, next) => {
  res.status(404).json({
    message: "Invalid Route",
    statuscode: 404,
  });
});

//server error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Server Error",
    statuscode: 500,
  });
});

module.exports = app;
