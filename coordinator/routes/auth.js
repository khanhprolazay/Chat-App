const jwt = require('jsonwebtoken');

module.exports = {
	verify: function (req, res, next) {
		const authHeader = req.headers['authorization'];
		if (!authHeader)
			return res.sendStatus(401);

		const token = authHeader.split(' ')[1];
		if (!token) res.sendStatus(401); // Unauthorize
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
			if (err) {
				console.log(err)
				res.status(403).send(err); // Forbidden
				return;
			}
			next();
		});
	},
};
