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

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       minlength: 3, // Minimum 3 characters
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true, // Ensure email is unique
//       validate: {
//         validator: function (value) {
//           // Regular expression for a valid email
//           const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//           return emailRegex.test(value);
//         },
//         message: "Invalid email format",
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       validate: {
//         validator: function (value) {
//           // Regular expression for a password with at least one capital letter,
//           // one special character, one number, and a minimum length of 8 characters
//           const passwordRegex =
//             /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//           return passwordRegex.test(value);
//         },
//         message:
//           "Invalid password format. It should contain at least one capital letter, one special character, one number, and be at least 8 characters long.",
//       },
//     },
//     playlists: {
//       type: Array,
//       required: false,
//     },
//     isAdmin: {
//       type: Boolean,
//       required: false,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("user", userSchema);
