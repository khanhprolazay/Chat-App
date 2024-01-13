const User = require('../models/User');
const Friend = require('../models/Friend');
const Invitation = require('../models/Invitation');

const findUser = async (req, res) => {
	const { username } = req.params;
	if (!username) return res.sendStatus(400);
	try {
		const user = await User.findByUsername(username);
		delete user.password;
		res.json(user);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

const findUserById = async (req, res) => {
	const { uid } = req.params;
	if (!uid) return res.sendStatus(400);
	try {
		const user = await User.findByUid(uid);
		res.json({
			uid: user.uid,
			phone: user.phone,
			username: user.username,
			display_name: user.display_name,
			avatar_image_id: user.avatar_image_id,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

// Get list of user that can be friend with requested user
const getUnfriends = async (req, res) => {
	const { uid } = req.params;
	if (!uid) return res.sendStatus(400);

	try {
		const users = await User.getAllUser();
		const friends = await Friend.getUserFriend(uid);

		// Here we get list of all user and friend of requested user
		// We will remove requested user and its friend from all user
		const user_index = users.findIndex((user) => user.uid.toString() === uid);
		if (user_index !== -1) users.splice(user_index, 1);

		// Remove requested user friends from all users
		friends.forEach((friend) => {
			const friend_index = users.findIndex(
				(user) => user.uid.toString() === friend.uid.toString()
			);
			if (friend_index !== -1) users.splice(friend_index, 1);
		});

		res.json(users);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getFriends = async (req, res) => {
	const { uid } = req.params;
	if (!uid) res.sendStatus(400);
	try {
		const fids = await Friend.getUserFriend(uid);
		const friends = [];
		await Promise.all(
			fids.map(async (fid) => {
				const user_infor = await User.findByUid(fid.uid);
				user_infor.cid = fid.cid;
				user_infor.is_checked = fid.is_checked;
				delete user_infor.password;
				friends.push(user_infor);
			})
		);
		res.json(friends);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

const getInvitations = async (req, res) => {
	const { uid } = req.params;
	if (!uid) return res.sendStatus(400);
	try {
		res.send(await Invitation.findSenderByReceiver(uid));
	} catch (err) {
		res.status(500).send(err);
	}
};

const getImage = async (req, res) => {
	const { uid } = req.params;
	if (!uid) return res.sendStatus(400);
	try {
		const user = await User.findByUid(uid);
		res.send(user.avatar_image);
	} catch (err) {
		consolo.log(err);
		res.status(500).json(err);
	}
};

const deleteInvitation = async (req, res) => {
	const { invitation } = req.body;
	if (!invitation) return res.sendStatus(400);

	try {
		const find = await Invitation.findOne(
			invitation.sender_id,
			invitation.receiver_id
		);
		if (find) await find.delete();
		res.sendStatus(200);
	} catch (err) {
		res.status(500).json(err);
	}
};

const createInvitation = async (sender_id, receiver_id) => {
	if (!sender_id || !receiver_id) return null;

	// Check if it already have the Invitation between them.
	// If yes, dont do anything
	// If no, create new invitation and save it
	const find = await Invitation.findOne(receiver_id, sender_id);
	if (find.sender_id) return null;

	const invitation = new Invitation({
		sender_id: sender_id,
		receiver_id: receiver_id,
	});
	await invitation.save();
	return invitation;
};

const getInformationById = async (req, res) => {
	try {
		const { uid } = req.params;
		if (!uid) return res.sendStatus(400);
		const user = await User.findByUid(uid);
		res.send(user);
	} catch (err) {
		console.log(err);
		res.status(500).send(null);
	}
};


module.exports = {
	findUser,
	findUserById,
	getUnfriends,
	createInvitation,
	getInvitations,
	getImage,
	getFriends,
	deleteInvitation,
	getInformationById,
};
