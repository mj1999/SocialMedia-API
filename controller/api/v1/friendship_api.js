const Friendship = require("../../../model/friendships");
const User = require("../../../model/user_schema");

//function for toggling friendship status with a user
module.exports.toggleFriend = async function (req, res) {
  let added = true;
  let existingFriendship = await Friendship.findOne({
    $or: [
      { from_user: req.user, to_user: req.body.toUser },
      { from_user: req.body.toUser, to_user: req.user },
    ],
  });
  let fromUser = await User.findById(req.user);
  let toUser = await User.findById(req.body.toUser);
  if (existingFriendship) {
    added = false;
    //added property can help determine client side if the friendship is created or if friend is removed
    fromUser.friends.pull(existingFriendship.id);
    fromUser.save();
    toUser.friends.pull(existingFriendship.id);
    toUser.save();
    existingFriendship.deleteOne();
    return res.status(200).json({
      data: {
        added,
        friendship: existingFriendship,
      },
      message: "Request successfull, friend removed",
    });
  } else {
    let newFriendship = await Friendship.create({
      from_user: req.user,
      to_user: req.body.toUser,
    });
    fromUser.friends.push(newFriendship);
    fromUser.save();
    toUser.friends.push(newFriendship);
    toUser.save();
    return res.status(200).json({
      data: {
        added,
        friendship: newFriendship,
      },
      message: "Request successfull, friend added",
    });
  }
};
