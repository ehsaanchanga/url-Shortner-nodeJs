require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConn");

const app = express();

const PORT = process.env.PORT || 8000;

// connection to Database
connectDb();

// template engine
app.set("view engine", "ejs");

//serve static files
app.use("/url", express.static(path.join(__dirname, "/public")));

// Middlewares

// built in middlewares

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Routes
//static routes
app.use("/url", require("./routes/url"));
// api routes
app.use("/api/url", require("./routes/api/url"));

// accepts all the methods
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", function () {
  console.log("connected to mongoDb");
  app.listen(PORT, () => console.log(`litening at port ${PORT}`));
});
