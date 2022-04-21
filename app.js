const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const logoutRoutes = require("./routes/logout");
const merchantRoutes = require("./routes/merchants");
const productRoutes = require("./routes/products");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/merchant/login", authRoutes);
app.use("/merchant/logout", logoutRoutes);
app.use("/merchant", merchantRoutes);
app.use("/merchant", productRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const { message = "something is not right", status = 500 } = error;
  res.status(status).send(message);
});
app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

module.exports = app;
