const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { default: mongoose, Mongoose } = require("mongoose");
const { validateKey } = require("../lib/passwordUtils");
const connection = require("../config/database");
const User = connection.models.User;
exports.authPost = [
  body("secret", "Key can not be empty. ")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Key minimum is 3 chars. ")
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("updateMembership", {
        errors: errors.array(),
        isSigned: req.isSigned,
      });
    } else {
      next();
    }
  }),
];
exports.authValidate = asyncHandler(async (req, res, next) => {
  const isValid = await validateKey(req.body.secret);
  console.log(isValid);
  if (!isValid) {
    res.redirect("/upgradeMembership");
  } else {
    await User.findByIdAndUpdate(req.user.id, {
      admin: true,
    });

    res.redirect("/allPost");
  }
});
