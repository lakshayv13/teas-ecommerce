const express = require("express");
const { userController } = require("../controllers/user");
const { verifyUser } = require("../middlewares/user");

const router = express.Router();

router.route("/signup").post(userController.signUp);
router.route("/signin").post(userController.signIn);

router
  .route("/me")
  .all(verifyUser)
  .get(userController.fetchProfile)
  .put(userController.updateProfile)
  .delete(userController.deleteProfile);

router.route("/logout").get(verifyUser, userController.logout);

module.exports = router;
