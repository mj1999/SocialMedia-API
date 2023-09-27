const express = require("express");
const router = express.Router();
const postApi = require("../../../controller/api/v1/posts_api");
const passport = require("passport");

router.get("/", postApi.index);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postApi.create
);
router.delete(
  "/:postID",
  passport.authenticate("jwt", { session: false }),
  postApi.delete
);
module.exports = router;
