const { format } = require("date-fns");
module.exports.convertDate = (timeStamp) => {
  return format(timeStamp, "PPP");
};
