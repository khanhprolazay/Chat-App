const Invitation = require('../models/Invitation');
const FriendController = require('./FriendController');

// Check if there is invitation between 2 specific people
const isExisted = async (sender_id, receiver_id) => {
	const isSender = await Invitation.findOne(sender_id, receiver_id);
	const isReceiver = await Invitation.findOne(receiver_id, sender_id);
	return isSender || isReceiver;
};

const createAndSave = async (req, res) => {
	try {
		const { sender_id, receiver_id } = req.body;
		const isFriend = await FriendController.isFriend(sender_id, receiver_id);
		const isInvitationExisted = await isExisted(sender_id, receiver_id);
		if (isFriend || isInvitationExisted)
			return res
				.status(409)
				.send(
					'Sender and receiver is already being friend or there is an invitation between them'
				);

		const invitation = new Invitation({
			sender_id: sender_id,
			receiver_id: receiver_id,
		});
		await invitation.save();
		res.status(200).send(invitation);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

const remove = async (req, res) => {
	try {
		const { sender_id, receiver_id } = req.body;
		const invitation = await Invitation.findOne(sender_id, receiver_id);
		if (invitation)
			await invitation.delete();
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

module.exports = {
	isExisted,
	createAndSave,
	remove,
};
