// Require our router
const router = require('express').Router();
const userController=require("../controllers/userController");
const { verifyToken } = require('../middleware/jwt_token');
// creating router
router.delete(
  '/',
  // Getting the deleteUser function from the userController
verifyToken,
  userController.deleteUser
);
router.get(
  '/',
  verifyToken,
// Getting the getUser function from the userController
  userController.getUser
);
// Export this router
module.exports = router;
