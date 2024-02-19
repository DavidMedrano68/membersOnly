const asyncHandler = require("express-async-handler");
module.exports.getMemebership = asyncHandler(async (req, res, next) => {
  res.render(`updateMembership`, {
    isSigned: req.isSigned,
    isAdmin: req.user.admin,
  });
});
