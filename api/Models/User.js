const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const bcryptRound = 12;
const jwt_secret = process.env.JWT_SECERT;

const user = mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => email.match(emailRegex),
      message: "You must provide a valid email.",
    },
  },
  profilePic: {
    type: String,
    default: "",
  },
  info: {
    type: String,
    default:
      "This is a fully customized message. Try pressing the plus sign and edit your description",
  },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  zip: { type: Number },
  email_token: { type: String },
  terms: { type: Boolean, required: true, default: false },
  newsLetter: { type: Boolean, default: false },
  password: {
    type: String,
    required: true,
    set: (password) => bcrypt.hashSync(password, bcryptRound),
  },
});

user.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

user.methods.getJWT = function () {
  return {
    user: this.toJSON(),
    jwt: {
      token: jwt.sign(this.toJSON(), jwt_secret, { expiresIn: 900 }),
      expires: 900,
    },
  };
};

user.methods.getRefresh = function () {
  return jwt.sign(this.toJSON(), jwt_secret);
};

user.methods.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    lastName: this.lastName,
    email: this.email,
    address: this.address,
    city: this.city,
    state: this.state,
    zip: this.zip,
    profilePic: this.profilePic,
    info: this.info,
  };
};

user.methods.toString = function () {
  return `hello ${this.name} ${this.last}`;
};

module.exports = mongoose.model("User", user);
