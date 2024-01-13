const AxiosServer = require('../AxiosServer');
const ip_1 = process.env.SERVER_1_IP;

const createAndSave = async (sender_id, receiver_id) => {
	try {
		const uri = '/user/invitation/create';
		const invitation = await AxiosServer.post(ip_1 + uri, {
			sender_id: sender_id,
			receiver_id: receiver_id,
		})
		return invitation;
	} catch(err) {	
		console.log(err);
		return null;
	}
};


const remove = async (sender_id, receiver_id) => {
	try {
		const uri = '/user/invitation/delete';
		await AxiosServer.post(ip_1 + uri, {
			sender_id: sender_id,
			receiver_id: receiver_id,
		})
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	remove,
	createAndSave,
};
