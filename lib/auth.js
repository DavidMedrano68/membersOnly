var passport = require("passport");
module.exports.isSigned = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.isSigned = true;
    next();
  } else {
    req.isSigned = false;
    next();
  }
};
module.exports.valid = (req, res, next) => {
  if (!req.isSigned) {
    res.redirect("register");
  } else {
    next();
  }
};
