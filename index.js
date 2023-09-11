require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConn");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 8000;

// connection to Database
connectDb();

// template engine
app.set("view engine", "ejs");

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Middlewares

// built in middlewares

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// Routes
app.use("/", require("./routes/staticRouter"));

app.use("/register", require("./routes/api/register"));
app.use("/authenticate", require("./routes/api/auth"));
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
