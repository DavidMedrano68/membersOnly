const crypto = require("crypto");
const Key = require("../models/adminPass");

// TODO
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: genHash,
  };
}
function createKey(password) {
  let salt = crypto.randomBytes(32).toString("hex");
  let keyHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: keyHash,
  };
}
async function populateDb() {
  const { salt, hash } = createKey("GreenApple1");
  const key = new Key({
    salt: salt,
    hash: hash,
  });
  await key.save();
}
async function validateKey(password) {
  const [doc] = await Key.find().exec();
  const hashVerify = crypto
    .pbkdf2Sync(password, doc.salt, 10000, 64, "sha512")
    .toString("hex");
  return doc.hash === hashVerify;
}
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.validateKey = validateKey;
