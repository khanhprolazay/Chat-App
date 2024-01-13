const Conversation = require('../models/Conversation');
const Participant = require('../models/Participant');
const uuid = require('uuid');

const addParticipant = async (req, res) => {
	const { userId, conversationId } = req.body;

	try {
		const conversation = await Conversation.findByCid(conversationId);
		if (!conversation) {
			return res.status(404).json({ message: 'Conversation not found' });
		}

		const participant = await Participant.findByUserId(userId);
		if (participant) {
			return res
				.status(400)
				.json({ message: 'Participant already exists in the conversation' });
		}

		const newParticipant = new Participant({
			conversation_id: conversationId,
			user_id: userId,
			type: 'participant',
			created_at: new Date(),
			updated_at: new Date(),
			nick_name: null,
		});
		await newParticipant.save();
		res
			.status(201)
			.json({ message: 'Participant added to the conversation successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const deleteParticipant = async (req, res) => {
	try {
		const { conversationId, userId } = req.body;
		const participant = await Participant.findByUserId(userId);
		if (
			!participant ||
			participant.conversation_id.toString() !== conversationId.toString()
		) {
			return res
				.status(404)
				.json({ message: 'Participant not found in conversation' });
		} else {
			await participant.delete();
			res.status(200).json({ message: 'Participant deleted successfully' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const getParticipantsByConversationId = async (req, res) => {
	try {
		const { conversationId } = req.params;
		const participants = await Participant.findAll({
			where: { conversation_id: conversationId },
		});
		res.status(200).json(participants);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	addParticipant,
	deleteParticipant,
	getParticipantsByConversationId,
};
