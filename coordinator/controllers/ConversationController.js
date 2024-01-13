const AxiosServer = require('../AxiosServer');

const ip_1 = process.env.SERVER_1_IP;

// Create a new conversation and save it
// uid: Person create a conversation
// participants: list of user id (0)
const createAndSave = async (data) => {
	try {
		const uri = '/conversation/create';
		const conversation = await AxiosServer.post(ip_1 + uri, data);
		return conversation;
	} catch (err) {
		console.log(err);
		return null;
	}
};

const getConversationsByUserId = async (req, res) => {
	try {
		const uri = `/conversation/get/${req.params.uid}`;
		const conversations = await AxiosServer.get(ip_1 + uri);
		res.json(conversations);
	} catch (error) {
		console.error(error);
		res.status(err.status).json(err.message);
	}
};

const updateLatestMessage = async (message) => {
	try {
		const uri = '/conversation/message/update';
		await AxiosServer.post(ip_1 + uri, {
			content: message.content,
			cid: message.conversation_id,
			created_at: message.created_at,
		});
	} catch (err) {
		throw err;
	}
};

const checkConversation = async (uid, participant_id, value) => {
	try {
		const uri = '/conversation/check';
		const body = {
			user_1: uid,
			user_2: participant_id,
			value: value,
		};
		await AxiosServer.post(ip_1 + uri, body);
	} catch (err) {
		console.log(err);
		console.log(true);
	}
};

module.exports = {
	createAndSave,
	checkConversation,
	updateLatestMessage,
	getConversationsByUserId,
};
