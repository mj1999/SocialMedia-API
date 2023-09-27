const express = require("express");
const router = express.Router();
const friendshipApi = require("../../../controller/api/v1/friendship_api");
const passport = require("passport");

router.post(
  "/toggle",
  passport.authenticate("jwt", { session: false }),
  friendshipApi.toggleFriend
);

module.exports = router;
