const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    agreeToTerms: {
      type: Boolean,
      required: true,
    },
    playlists: {
      type: Array,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
