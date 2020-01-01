const express = require('express');

const isAuth = require('../middleware/is-auth');
const billController = require('../controllers/post');

const router = express.Router();

router.post('/post', isAuth, billController.postBill);

router.get('/posts', isAuth, billController.getBills);

module.exports = router;
