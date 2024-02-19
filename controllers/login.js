const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const connection = require("../config/database");
const User = connection.models.User;
const { genPassword } = require("../lib/passwordUtils");
const passport = require("passport");
exports.registerPost = [
  body("firstName", "First name can not be empty.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("lastName", "Last name can not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("email", "Email can not be empty").trim().isLength({ min: 5 }).escape(),
  body("password", "Please enter valid password")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Password minimum 4 chars")
    .escape(),
  body("passwordCon", "Please Re-enter password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password minimum 4 chars")
    .custom((value, { req }) => {
      if (req.body.password === req.body.passwordCon) {
        return true;
      } else {
        return false;
      }
    }),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      salt: salt,
      hash: hash,
      admin: false,
    });

    if (!errors.isEmpty()) {
      res.render("register", {
        errors: errors.array(),
      });
    } else {
      await user.save();
      res.redirect("login");
    }
  }),
];
exports.loginPost = [
  body("email", "Email can not be empty").trim().isLength({ min: 5 }).escape(),
  body("password", "Please enter valid password")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Password minimum 4 chars")
    .escape(),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("login", {
        errors: errors.array(),
      });
    } else {
      next();
    }
  }),
];
module.exports.getRegister = asyncHandler(async (req, res, next) => {
  res.render("register", { isSigned: req.isSigned });
});
module.exports.getLogin = asyncHandler(async (req, res, next) => {
  if (req.isSigned) {
    res.redirect("allPost");
  } else {
    res.render("login");
  }
});
module.exports.getRoot = asyncHandler(async (req, res, next) => {
  res.render("homePage", { isSigned: req.isSigned, isAdmin: req.user.admin });
});
module.exports.logOut = asyncHandler((req, res, next) => {
  req.logout((err) => {
    err ? next(err) : res.redirect("/login");
  });
});
