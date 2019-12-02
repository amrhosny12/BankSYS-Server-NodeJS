const Account = require("../models/account");
const User = require("../models/user");


exports.getAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({ owner: req.UID });
    res.status(200).json({
      accounts: accounts
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAccount = async (req, res, next) => {
  const acctId = req.params.acctId;
  try {
    const account = await Account.findById(acctId);
    res.status(200).json({
      account: account
    })
  }catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}; 

exports.createAccount = async (req, res, next) => {
  const accountNumber = req.body.accountNumber;
  const routingNumber = req.body.routingNumber;
  const accountType = req.body.accountType;
  const description = req.body.description;
  const balance = req.body.balance;
  const account = new Account({
    accountNumber: accountNumber,
    routingNumber: routingNumber,
    accountType: accountType,
    description: description,
    balance: balance,
    owner: req.UID
  });
  try {
    await account.save();
    const user = await User.findById(req.UID);
    user.accounts.push(account);
    await user.save();
    res.status(201).json({ message: "ACCOUNT_CREATED", account: account });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
