const Conversation = require('../models/Conversation');
const Participant = require('../models/Participant');
const Invitation = require('../models/Invitation');
const Friend = require('../models/Friend');
const uuid = require('uuid');

// Create a new conversation and save it
// uid: Person create a conversation
// participants: list of user id (0)
const createAndSave = async (req, res) => {
	const { creator_id, participants, type, title } = req.body;
	try {
		if (!creator_id || !Array.isArray(participants) || !participants.length)
			return res.sendStatus(400);

		// Only accept one of those type: personal and type
		if (type !== 'personal' && type !== 'group') 
			return res.sendStatus(400);

		// Check if the conversation between 2 people is existed
		// If yes => return null
		// If no => create new conversation, save and return it
		if (type === 'personal') {
			const existed = await Friend.getPersonalConversationBetween(
				creator_id,
				participants[0]
			);
			if (existed.length)  
			return res.sendStatus(400);
		}

		const cid = uuid.v1();
		const conversation = new Conversation({
			cid: cid,
			type: type,
			title: title,
			is_checked: false,
			creator_id: creator_id,
			created_at: new Date(),
			updated_at: new Date(),
		});
		await conversation.save();

		// If this is a personal conversation => add two person into friend table;
		if (type === 'personal') {
			const friend_1 = new Friend({
				user_1: creator_id,
				user_2: participants[0],
				cid: cid,
				is_checked: false,
			});
			const friend_2 = new Friend({
				user_1: participants[0],
				user_2: creator_id,
				cid: cid,
				is_checked: false,
			});
			await friend_1.save();
			await friend_2.save();

			// Delete the invitation if the conversation is created when they make friends :)))
			const invitation = await Invitation.findOne(creator_id, participants[0])
			if (invitation) await invitation.delete()
			return res.status(200).send(conversation);
		}

		// If the conversation type is 'group'
		// Save it's participant to database
		participants.push(creator_id);
		await Promise.all(
			participants.map(async (participant) => {
				const new_participant = new Participant({
					conversation_id: cid,
					user_id: participant,
					type: null,
					created_at: Date.now(),
					updated_at: Date.now(),
				});
				await new_participant.save();
			})
		);
		return res.status(200).send(conversation);
	} catch (err) {
		// Create conversation unscessfully for some reasons
		// Delete conversation
		// Delete friend if type === personal
		if (type === 'personal')
			await Promise.all([
				async () => {
					const deleteConversation = await Conversation.findByCid(cid);
					if (deleteConversation) await deleteConversation.delete();
				},
				async () => {
					const f1 = await Friend.findOne(creator_id, participants[0]);
					if (f1) await f1.delete();
				},
				async () => {
					const f2 = await Friend.findOne(participants[0], creator_id);
					if (f2) await f2.delete();
				}
			]).catch(() => true);
			
		console.log(err);
		res.sendStatus(500);
	}
};

const getConversationsByUserId = async (req, res) => {
	const { uid } = req.params;
	if (!uid) return res.sendStatus(400);
	try {
		// Get personal conversation of user
		const personal_conversation_id = await Friend.getPersonalConversation(uid);
		const group_conversation_id =
			await Participant.getGroupConversationByUserId(uid);
		const conversation_id = personal_conversation_id.concat(
			group_conversation_id
		);

		// Get group conversation of user
		const conversations = [];
		await Promise.all(
			conversation_id.map(async ({ cid }) => {
				const conversation = await Conversation.findByCid(cid);
				conversations.push(conversation);
			})
		);
		res.json(conversations);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const updateLatestMessage = async (req, res) => {
	try {
		const { cid, content, created_at }= req.body;
		const conversation = await Conversation.findByCid(cid);
		conversation.lasted_message_content = content;
		conversation.lasted_message_time = created_at;
		await conversation.update();
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

const checkConversation = async (req, res) => {
	try {
		const { user_1, user_2, value } = req.body;
		const friend = await Friend.findOne(user_1, user_2);
		if (friend) {
			friend.is_checked = value;
			await friend.update();
		}
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

module.exports = {
	createAndSave,
	checkConversation,
	updateLatestMessage,
	getConversationsByUserId,
};
