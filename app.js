/** @format */

const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/customer');
const transactionRoutes = require('./routes/transaction');
const billRoutes = require('./routes/bill');

dotenv.config();

const app = express();

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-0wpw9.mongodb.net/${process.env.MONGODB_DATABASE}`;

app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access_log'), { flag: 'a' });

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
	next();
});

app.use(helmet());

app.use(morgan('combined', { stream: accessLogStream }));

app.use('/auth', authRoutes);
app.use('/customer', accountRoutes);
app.use('/transaction', transactionRoutes);
app.use('/bill', billRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const statusCode = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(statusCode).json({ message: message, data: data });
});

mongoose
	.connect(MONGODB_URI)
	.then(result => {
		app.listen(process.env.PORT);
	})
	.catch(err => console.log(err));
