const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create user model, schema
let userSchema = new Schema({
  username: {
    required: true,
    type: String
  },
  role: {
    required: true,
    type: String,
    enum: ['admin', 'user']
  },
  uid: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
})

let User = mongoose.model('user', userSchema);

module.exports = User;
