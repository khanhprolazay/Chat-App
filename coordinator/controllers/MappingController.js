const ip_1 = process.env.SERVER_1_IP;
const AxiosServer = require('../AxiosServer');

const createAndSave = async (uid, socket_id) => {
	try {
		const uri = '/mapping/create';
		const mapping = await AxiosServer.post(ip_1 + uri, {
			uid: uid,
			socket_id: socket_id,
		});
		return mapping;
	} catch (err) {
		console.log(err);
		return null;
	}
};

const findOne = async (uid) => {
	try {
		const uri = `/mapping/${uid}/get`;
		return await AxiosServer.get(ip_1 + uri);
	} catch (err) {
		console.log(err);
		return null;
	}
};

const remove = async (uid) => {
	try {
		const uri = '/mapping/delete';
		await AxiosServer.post(ip_1 + uri, { uid: uid });
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	createAndSave,
	findOne,
	remove,
};
