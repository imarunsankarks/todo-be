const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (name, email, password, role) {
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Enter a strong password");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    email,
    password: hash,
    role,
  });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled");
  const user = await this.findOne({ email });
  if (!user) throw Error("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw Error("Incorrect password");
  return user;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
