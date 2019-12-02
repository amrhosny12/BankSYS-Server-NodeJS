const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = Schema({
  accountNumber: {
    type: String,
    require: true
  },
  routingNumber: {
    type: String,
    require: true
  },
  accountType: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  balance: {
    type: Number,
    require: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  }
});

module.exports = mongoose.model("Account", accountSchema);
