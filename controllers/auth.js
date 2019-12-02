const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const GenerateToken = require('../shared/generateToken');


exports.signup = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	const userType = req.body.userType;
	const email = req.body.email;
	const phone = req.body.phone;
	const imageUrl = req.body.imageUrl;
	try {
		const hashedPW = await bycrpt.hash(password, 12);
		const user = new User({
			username: username,
			password: hashedPW,
			userType: userType,
			email: email,
			phone: phone,
			imageUrl: imageUrl
		});
    const createdUser = await user.save();
    const _uid = createdUser._id.toString();
    const token = GenerateToken(createdUser.username, _uid);
		res.status(201).json({message: 'USER_CREATED', token: token, expiresIn: process.env.TOKEN_EXPIRE_IN, username: createdUser.username, UID: _uid});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.login = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	let loadedUser;
	try {
		const user = await User.findOne({username: username});
		if (!user) {
      const error = new Error('INVALID_USERNAME');
			error.statusCode = 401;
			throw error;
		}
		loadedUser = user;
		const isEqual = await bycrpt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error('INVALID_PW');
			error.statusCode = 401;
			throw error;
		}
    const _uid = loadedUser._id.toString();
		const token = GenerateToken(loadedUser.username, _uid);
		res.status(200).json({token: token, expiresIn: process.env.TOKEN_EXPIRE_IN, username: loadedUser.username, UID: _uid});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

