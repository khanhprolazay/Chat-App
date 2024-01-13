const Message = require('../models/Message');
const uuid = require('uuid');

const getMessageByConversationId = async (req, res) => {
	try {
		const { cid } = req.params;
		const messages = await Message.findByConversationId(cid);
		res.send(messages);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

const sendMessage = async (req, res) => {
	const { cid, sender_id, content, image_id } = req.body;

	try {
			const message = new Message({
				mid: uuid.v1(),
				conversation_id: cid,
				sender_id,
				content,
				image_id,
				created_at: new Date(),
			});
			await message.save();
	
		res.json({ message: 'Message sent successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Error sending message' });
	}
};

const createAndSave = async (req, res) => {
	try {
		const { message } = req.body;
		const new_message = new Message({
      mid: message.mid,
      content: message.content,
      sender_id: message.sender_id,
      created_at: new Date(message.created_at),
      conversation_id: message.conversation_id,
			image_id: message.image ? message.image.iid : null,
    });
    await new_message.save();
    res.status(200).send(new_message);
	} catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
};

const remove = async (req, res) => {
	try {
		const { mid } = req.body;
		const message = await Message.findOne(mid);
		if (message) message.delete();
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
}

module.exports = {
	remove,
	sendMessage,
	createAndSave,
	getMessageByConversationId,
};
