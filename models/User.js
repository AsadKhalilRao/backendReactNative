const mongoose = require('mongoose');
// Creating Schema
// Name of Schema
const UserSchema = new mongoose.Schema({
  username: {
    // Provide the data type of username
    type: String,
    //User name has to be required for that set the
    // require property to true
    require: true,
  },
  email: {
    // Provide the data type of username
    type: String,
    //User name has to be required for that set the
    // require property to true
    require: true,
    // Each user has to have a unique email
    unique: true,
  },
  password: {
    // Provide the data type of username
    type: String,
    //User name has to be required for that set the
    // require property to true
    require: true,
    // Each user has to have a unique email
    unique: true,
  },
  profile: {
    // Provide the data type of username
    type: String,
    // Each user has to have a unique email
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png',
  },
});
module.exports = mongoose.model('User', UserSchema);
