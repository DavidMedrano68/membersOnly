const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const loginController = require("../controllers/login");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const memberShipController = require("../controllers/membershipController");
const { valid } = require("../lib/auth");

const { default: mongoose, Mongoose } = require("mongoose");
router.post(
  "/login",
  loginController.loginPost,
  passport.authenticate("local", {
    successRedirect: "/allPost",
    failureRedirect: "/login",
  })
);
router.get("/allPost", valid, postController.getAllPost);
router.get("/logout", loginController.logOut);
router.get("/", valid, loginController.getRoot);

router.get("/login", loginController.getLogin);

router.get("/register", loginController.getRegister);
router.post("/register", loginController.registerPost);
router.get("/createPost", valid, postController.createPost);
router.post("/createPost", postController.postPost);
router.get("/upgradeMembership", valid, memberShipController.getMemebership);
router.post(
  "/upgradeMembership",
  authController.authPost,
  authController.authValidate
);
router.post("/:id/delete", postController.postDelete);
module.exports = router;
