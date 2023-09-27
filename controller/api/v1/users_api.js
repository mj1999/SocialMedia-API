const User = require("../../../model/user_schema");
const jwt = require("jsonwebtoken");
//function for user creation
module.exports.createUser = async function (req, res) {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      let newUser = await User.create(req.body);
      res.status(200).json({
        message: "User Created",
        data: { newUser },
      });
    } else {
      res.json({
        message: "User already present under this username",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
//function fetch user profile
module.exports.getProfile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id).populate({
      path: "friends",
      select: "from_user to_user",
      populate: {
        path: "from_user to_user",
        select: "name email",
      },
    });
    if (user) {
      res.status(200).json({
        message: "User Profile",
        data: {
          name: user.name,
          email: user.email,
          profilePic: user.avatar,
          friends: user.friends,
        },
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
//function for authentication and generating JWT token
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid Username/Password",
      });
    }
    return res.status(200).json({
      message: "Sign-in successfull, token generated",
      data: {
        token: jwt.sign(user.toJSON(), "toor", { expiresIn: "1000000" }),
        username: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
