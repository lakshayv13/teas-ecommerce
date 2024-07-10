const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { createHmac } = require("node:crypto");

const UserSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
    unique: true,
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    return next();
  }

  const hash = createHmac(
    process.env.CRYPTO_ALGORITHM,
    process.env.CRYPTO_SECRET
  )
    .update(this.password)
    .digest("hex");

  this.password = hash;
  next();
});

UserSchema.methods.verifyPassword = function (password) {
  const hash = createHmac(
    process.env.CRYPTO_ALGORITHM,
    process.env.CRYPTO_SECRET
  )
    .update(password)
    .digest("hex");

  return this.password === hash;
};

UserSchema.methods.getAuthToken = function () {
  const tokenPayload = { id: this._id, email: this.email };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
  return token;
};

const User = new mongoose.model("users", UserSchema);

module.exports = {
  User,
};
