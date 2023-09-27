const express = require("express");
const router = express.Router();

router.use("/posts", require("./posts"));
router.use("/users", require("./users"));
router.use("/friends", require("./friendship"));
router.use("/comment", require("./comment"));

module.exports = router;
