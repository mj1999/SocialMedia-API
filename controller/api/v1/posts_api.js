const Posts = require("../../../model/post");
const Comment = require("../../../model/comment");
//function for listing all posts
module.exports.index = async function (req, res) {
  let posts = await Posts.find({})
    .sort("-createdAt")
    .select("content user")
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "comments",
      select: "content user",
      populate: {
        path: "user",
        select: "name email",
      },
    });
  return res.status(200).json({
    message: "list of posts",
    posts: posts,
  });
};
//function for deleting a post and its associated comments
module.exports.delete = async function (req, res) {
  try {
    let post = await Posts.findById(req.params.postID);
    if (post.user == req.user.id) {
      post.deleteOne();
      await Comment.deleteMany({ post: req.params.postID });
      return res.status(200).json({
        message: "Post and associated comments delted",
      });
    } else {
      return res.status(401).json({
        message: "You cannot delete this post!",
      });
    }
  } catch (err) {
    console.log("error deleting post:,", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
//function for creating new posts
module.exports.create = async function (req, res) {
  try {
    let post = await Posts.create({
      content: req.body.content,
      user: req.user._id,
    });
    post = await post.populate("user", "name");
    return res.status(200).json({
      data: {
        post,
      },
      message: "Post created!",
    });
  } catch (err) {
    console.log(err, "error creating post");
  }
};
