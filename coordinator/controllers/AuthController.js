const uuid = require('uuid');
const AxiosServer = require('../AxiosServer');

const ip_1 = process.env.SERVER_1_IP;
const ip_3 = process.env.SERVER_3_IP;
const default_image_url =
	'https://png.pngtree.com/png-clipart/20190516/original/pngtree-man-avatar-icon-professional-man-character-business-man-avatar-carton-symbol-png-image_3669490.jpg';

const createNewUser = async (req, res) => {
	const uid = uuid.v1();
	const iid = uuid.v1();
	const body_1 = { ...req.body, uid: uid, avatar_image_id: iid };
	const body_2 = { iid: iid, link: default_image_url, data: null };
	try {
		await AxiosServer.post(ip_1 + '/auth/signup', body_1);
		await AxiosServer.post(ip_3 + '/image/create', body_2);
		res.sendStatus(200);
	} catch (err) {
		Promise.all([
			AxiosServer.post(ip_1 + '/auth/user/delete', { uid: uid }).catch(() => true),
			AxiosServer.post(ip_3 + '/image/delete', { iid: iid }).catch(() => true),
		]).finally(() => {
			const status = err.status ? err.status : 500;
			const data = err.data ? err.data : '';
			res.status(status).send(data);
		});
	}
};

const login = async (req, res) => {
	try {
		let { user, refreshToken, accessToken } = await AxiosServer.post(ip_1+'/auth/login', req.body);
		let image = await AxiosServer.get(ip_3+`/image/${user.avatar_image_id}/get`);
		
		user = {...user, image: image};
		res.status(200).json({user, refreshToken, accessToken});
	} catch (err) {
		console.log(err);
		const status = err.status ? err.status : 500;
		const data = err.data ? err.data : '';
		res.status(status).send(data);
	}
};

const logout = async (req, res) => {
	if (!req.body.uid) {
		return res.sendStatus(400);
	}
	res.sendStatus(200);
};

const getNewAccessToken = async (req, res) => {
	try {
		const uri = '/auth/token/get_new_access_token';
		const accessToken = await AxiosServer.post(ip_1+uri, req.body);
		res.send(accessToken);
	} catch (err) {
		const status = err.status ? err.status : 500;
		const data = err.data ? err.data : '';
		res.status(status).send(data);
	}
};

module.exports = {
	createNewUser,
	login,
	logout,
	getNewAccessToken,
};
