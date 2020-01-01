const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = Schema ({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    dayOfMonth: {
        type: Number,
        require: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

module.exports = mongoose.model('Bill', billSchema);