const express = require('express');

const isAuth = require('../middleware/is-auth');
const transactionController = require('../controllers/transaction');

const router = express.Router();

router.get('/transfers', isAuth, transactionController.getTransfers);

router.get('/transfers/account', isAuth, transactionController.getTransfersByAccount);

router.get('/transfer/:transId', isAuth, transactionController.getTransfer);

router.post('/transfer', isAuth, transactionController.postTransfer);

module.exports = router;

