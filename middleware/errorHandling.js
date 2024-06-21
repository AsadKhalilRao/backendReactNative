// Creating errorHandler function
const errorHandler = (req, res, next, error) => {
  return res
    .status(500)
    .json({ status: true, message: 'Something went wrong' });
};
// Exporting errorHandler function
module.exports = errorHandler;
// Make sure you hook this errorHandler function inside
// server.js
