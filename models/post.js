const mongoose = require("mongoose");
const { convertDate } = require("../lib/convertTime");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  timeStamp: { type: Date, default: Date.now },
  title: { type: String, minLength: 3, maxLength: 40 },
  text: { type: String, minLength: 3, maxLength: 100 },
});
postSchema.virtual("url").get(function () {
  return `/${this._id}`;
});
postSchema.virtual("time").get(function () {
  return convertDate(this.timeStamp);
});
module.exports = mongoose.model("Post", postSchema);
