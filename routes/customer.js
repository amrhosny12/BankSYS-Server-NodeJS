const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');
const accountController = require('../controllers/customer');

const router = express.Router();

router.get('/accounts', isAuth, accountController.getAccounts);

router.get('/account/:acctId', isAuth, accountController.getAccount);

router.post('/account', isAuth, accountController.createAccount); 

module.exports = router;