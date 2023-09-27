const express = require("express");
const router = express.Router();
const usersApi = require("../../../controller/api/v1/users_api");

router.post("/create-user", usersApi.createUser);
router.post("/create-session", usersApi.createSession);
router.get("/profile/:id", usersApi.getProfile);

module.exports = router;
