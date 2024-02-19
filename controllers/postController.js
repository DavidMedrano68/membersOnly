const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { default: mongoose, Mongoose } = require("mongoose");
exports.postPost = [
  body("title", "Title can not be empty. ")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title minimum is 3 chars. ")
    .escape(),
  body("postText", "Post text can not be empty. ")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const post = new Post({
      text: req.body.postText,
      title: req.body.title,
      author: req.user.id,
    });

    if (!errors.isEmpty()) {
      res.render("createPost", {
        errors: errors.array(),
        isSigned: req.isSigned,
      });
    } else {
      await post.save();

      res.redirect("allPost");
    }
  }),
];
exports.postDelete = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();
  if (post === null) {
    const err = new Error("Artist not found");
    err.status = 404;
    return next(err);
  }
  await Post.findByIdAndDelete(req.body.post);
  res.redirect("/allPost");
});
exports.createPost = asyncHandler(async (req, res, next) => {
  res.render(`createPost`, {
    isSigned: req.isSigned,
    isAdmin: req.user.admin,
  });
});
module.exports.getAllPost = asyncHandler(async (req, res, next) => {
  const [postCount, postList] = await Promise.all([
    Post.countDocuments({}).exec(),
    Post.find({}).exec(),
  ]);
  res.render("allPost", {
    postCount: postCount,
    postList: postList,
    isSigned: req.isSigned,
    isAdmin: req.user.admin,
  });
});
