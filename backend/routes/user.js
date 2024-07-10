const express = require("express");
const { userController } = require("../controllers/user");
const { verifyUser } = require("../middlewares/user");

const router = express.Router();

router.route("/signup").post(userController.signUp);
router.route("/signin").post(userController.signIn);

router.route("/me").get(verifyUser, userController.fetchProfile);

router.route("/logout").get(verifyUser, userController.logout);

module.exports = router;
