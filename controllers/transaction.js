const Transaction = require('../models/transaction');
const Account = require('../models/account');

const TRANSFER_TYPE = 0;

exports.postTransfer = async (req, res, next) => {
	const from = req.body.from;
	const to = req.body.to;
	const amount = req.body.amount;
    const type = req.body.type;
	const date = req.body.date;
    const memo = req.body.memo;
    const frequency = req.body.frequency;
	const transaction = new Transaction({
		from: from,
		to: to,
		amount: amount,
        type: type,
		date: date,
		frequency: frequency,
		memo: memo,
		transType: TRANSFER_TYPE,
		owner: req.UID
	});
	try {
		const fromAccount = await Account.findOne({
			accountNumber: from,
			owner: req.UID
		});
		if (!fromAccount) {
			const error = new Error('Account Not Found');
			error.statusCode = 404;
			throw error;
		}
		if (amount > fromAccount.balance) {
			const error = new Error('Insufficient Balance For This Transaction');
			error.statusCode = 400;
			throw error;
		}
		await transaction.save();
		res
			.status(201)
			.json({ message: 'Transaction Created', transaction: transaction });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getTransfers = async (req, res, next) => {
	try {
		const transactions = await Transaction.find({ owner: req.UID, transType: 0 });
		res.status(200).json({
			transactions: transactions
		});
	} catch (err) {
		if (!err.statusCode) {
			error.statusCode = 500;
		}
		next(err);
	}
};

exports.getTransfersByAccount = async (req, res, next) => {
	const accountNumber = req.body.accountNumber;
	try {
		const transactions = await Transaction.find({
            owner: req.UID,
            transType: TRANSFER_TYPE,
			$or: [{ from: accountNumber }, { to: accountNumber }]
        });
        res.status(200).json({
            transactions: transactions
        })
	} catch (err) {
        if(!err.statusCode) {
            error.statusCode = 500;
        }
        next(err);
    }
};

exports.getTransfer = async (req, res, next) => {
    const transId = req.params.transId;
    try {
        const transaction = await Transaction.findById(transId);
        if (transaction.transType != TRANSFER_TYPE) {
            const error = new Error('Transaction Is Not a Transfer');
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json({
            transaction: transaction
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
