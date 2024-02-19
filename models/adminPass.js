const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const keySchema = new Schema({
  salt: { type: String },
  hash: { type: String },
});

module.exports = mongoose.model("Key", keySchema);
