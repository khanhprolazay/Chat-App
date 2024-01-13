const Friend = require('../models/Friend');

const isFriend = async (user_1, user_2) => {
	const friend = await Friend.findOne(user_1, user_2);
	return friend ? true : false;
};


module.exports = {
	isFriend,
};
