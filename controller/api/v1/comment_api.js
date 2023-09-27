const Comment = require("../../../model/comment");
const Post = require("../../../model/post");

//function for creating comment
module.exports.createComment = async function (req, res) {
  try {
    let post = await Post.findById(req.body.postID);
    let comment = await Comment.create({
      content: req.body.content,
      user: req.user._id,
      post: post._id,
    });
    post.comments.push(comment);
    post.save();
    comment = await comment.populate("user", "name");
    res.status(200).json({
      data: {
        comment,
      },
      message: "comment added successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log("error while commenting", err);
  }
};

//function for deleting comment
module.exports.delete = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.commentID).populate({
      path: "post",
    });
    if (comment.post.user == req.user.id || comment.user == req.user.id) {
      comment.deleteOne();
      await Post.findByIdAndUpdate(comment.post.id, {
        $pull: { comments: req.query.commentID },
      });
    }
    res.status(200).json({
      message: "Comment Deleted!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log("error deleting comment", err);
  }
};
