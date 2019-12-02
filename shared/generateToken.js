const jwt = require('jsonwebtoken');

module.exports = (username, uid) => {
	return jwt.sign(
		{
			username: username,
			UID: uid
		},
		process.env.CLIENT_SIGNATURE,
		{expiresIn: +process.env.TOKEN_EXPIRE_IN}
	);
};
