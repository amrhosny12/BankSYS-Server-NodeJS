const Bill = require('../models/bill');

exports.postBill = async (req, res, next) => {
	const name = req.body.name;
	const type = req.body.type;
	const description = req.body.description;
	const amount = req.body.amount;
	const dayOfMonth = req.body.dayOfMonth;
	const bill = new Bill({
		name: name,
		type: type,
		description: description,
		amount: amount,
		dayOfMonth: dayOfMonth,
		owner: req.UID
	});
	try {
		await bill.save();
		res.status(201).json({ message: 'Bill Created', bill: bill });
	} catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
	}
};

exports.getBills = async (req, res, next) => {
	try {
		const bills = await Bill.find({ owner: req.UID });
		res.status(200).json({ bills: bills });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
