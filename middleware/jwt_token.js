const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  // Storing token when it comes from user
  const authHeader = req.headers.authorization;

  // ifauthHeader exists
  if (authHeader) {
    // Creating instance
    const token = authHeader.split(' ')[1];
    // Verifying whether the token we got from the user is valid token or not
    console.log('Token:', token);
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      // If we have an error, we send response to the user
      if (err) {
        return res.status(
          403,
          json({ status: false, message: 'We have an Invalid Token' })
        );
      }
      // If the token is valid
      else {
        req.user = user;
        //  Passing in the next function
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({
        status: false,
        message: 'Unfortunately you are not authenticated',
      });
  }
};
module.exports = { verifyToken };
