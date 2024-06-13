// Require our router
const router = require('express').Router();
const authController = require("../controllers/authController")
// creating router
router.post(
  '/register',
  // Mapping authController.createUser function
  authController.createUser
);
router.post(
  '/login',
  // Mapping authController.loginUser function
  authController.loginUser
);
// Export this router
module.exports = router;
