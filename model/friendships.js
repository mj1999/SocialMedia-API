const mongoose = require("mongoose");
//to maintain data of who sent the request to whom
const friendshipSchema = new mongoose.Schema(
  {
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = Friendship;
