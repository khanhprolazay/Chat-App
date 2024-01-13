const FormData = require('form-data');
const AxiosServer = require('../AxiosServer');

const ip_2 = process.env.SERVER_2_IP;
const ip_3 = process.env.SERVER_3_IP;

const getMessageByConversationId = async (req, res) => {
	try {
		const { cid } = req.params;
		const uri = `/message/conversation/${cid}/get`;
		const messages = await AxiosServer.get(ip_2 + uri);
		await Promise.all(
			messages.map(async (message, index) => {
				if (message.image_id) {
					const image_uri = `/image/${message.image_id}/get`;
					const image = await AxiosServer.get(ip_3 + image_uri);
					messages[index] = { ...message, image: image };
				}
			})
		).catch((err) => res.status(err.status).send(err.data));

		res.send(messages);
	} catch (err) {
		res.status(err.status).send(err.data);
	}
};

const createAndSave = async (message) => {
	const mid = message.mid;
	const message_image = { ...message.image };

	if (message.image) {
		delete message.image.data;
		delete message.image.link;
	}

	try {
		const uri_1 = '/message/create';
		const uri_2 = '/image/create';

		// Store message
		const new_message = await AxiosServer.post(ip_2 + uri_1, {
			message: message,
		});

		// Create and image instance and store it
		let image = null;
		const headers = { 'Content-Type': 'multipart/form-data' };
		if (message_image.iid) {
			const formData = new FormData();
			formData.append('iid', message_image.iid);
			formData.append('link', '');
			formData.append('data', message_image.data, 'image.png');
			image = await AxiosServer.post(ip_3 + uri_2, formData, { headers });
		}

		return { ...new_message, image: image };
	} catch (err) {
		// Stora image and message failed for some reasons
		// Delete message and image
		await Promise.all([
			AxiosServer.post(ip_2 + '/message/delete', { mid: mid }).catch(() => true),
			AxiosServer.post(ip_3 + '/image/delete', { iid: message_image.iid,}).catch(() => true),
		]);

		console.log(err);
		return null;
	}
};

module.exports = {
	createAndSave,
	getMessageByConversationId,
};
