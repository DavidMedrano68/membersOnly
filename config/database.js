const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conn = "mongodb://localhost:27017/members";

const connection = mongoose.createConnection(conn);

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register

const UserSchema = new Schema({
  firstName: { type: String, maxLength: 25, minLength: 3, required: true },
  lastName: { type: String, maxLength: 25, minLength: 3, required: true },
  email: { type: String, maxLength: 40, minLength: 5, required: true },
  salt: { type: String },
  hash: { type: String },
  admin: { type: Boolean },
});
const User = connection.model("User", UserSchema);

// Expose the connection
module.exports = connection;
