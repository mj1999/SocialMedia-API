const express = require("express");
const router = express.Router();
const commentApi = require("../../../controller/api/v1/comment_api");
const passport = require("passport");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  commentApi.createComment
);

router.delete(
  "/:commentID",
  passport.authenticate("jwt", { session: false }),
  commentApi.delete
);

module.exports = router;
