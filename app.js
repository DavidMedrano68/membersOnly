const express = require("express");
const session = require("express-session");

const passport = require("passport");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const path = require("path");
const mongoDB = "mongodb://localhost:27017/members";
const { isSigned } = require("./lib/auth");
// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require("connect-mongo");

// Need to require the entire Passport config module so app.js knows about it

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
// Create the Express application
var app = express();
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

app.use(
  session({
    secret: "trustedGrape",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/members",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(isSigned);

/**
 * -------------- ROUTES ----------------
 */

app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);
