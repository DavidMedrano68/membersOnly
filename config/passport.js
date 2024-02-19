const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const { validPassword } = require("../lib/passwordUtils");
const User = connection.models.User;
const customFields = {
  usernameField: "email",
  passwordField: "password",
};
passport.use(
  new LocalStrategy(customFields, function (email, password, cb) {
    console.log("this is running");
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return cb(null, false);
        }
        const isValid = validPassword(password, user.hash, user.salt);
        console.log(isValid);
        if (isValid) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      })
      .catch((err) => cb(err));
  })
);
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((userId, cb) => {
  User.findById(userId)
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => cb(err));
});
