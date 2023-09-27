const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
//for profile picture option
const AVATAR_PATH = path.join("/uploads/users/avatars");
//users model
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friendship",
      },
    ],
  },
  {
    timestamps: true,
  }
);
//using multer to process uploaded file information and storing its uploaded path as avatar in our model
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

userSchema.statics.uploadedAvatar = multer({ storage }).single("avatar");
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("users", userSchema);

module.exports = User;
