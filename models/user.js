const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  userType: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String
  },
  imageUrl: {
    type: String
  },
  accounts: [{
      type: Schema.Types.ObjectId,
      ref: 'Account'
  }]
});

module.exports = mongoose.model("User", userSchema);
