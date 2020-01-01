const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = Schema({
	from: {
		type: String,
		require: true
	},
	to: {
		type: String,
		require: true
	},
	amount: {
		type: Number,
		require: true
	},
	type: {
		type: Number,
		require: true
	},
	date: {
		type: Date,
		require: true
	},
	frequency: {
		type: Number
	},
	memo: {
		type: String
	},
	transType: {
		type: Number,
		require: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true
	}
});


module.exports = mongoose.model("Transaction", transactionSchema);