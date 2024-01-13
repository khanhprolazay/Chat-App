const Invitation = null;
const AxiosServer = require('../AxiosServer');

const ip_1 = process.env.SERVER_1_IP;
const ip_3 = process.env.SERVER_3_IP;

const findUser = async (req, res) => {
	try {
		const uri = `/user/${req.params.username}/get`;
		const user = await AxiosServer.get(ip_1 + uri);
		res.json(user);
	} catch (err) {
		res.status(err.status).send(err.message);
	}
};

const findUserById = async (req, res) => {
	try {
		const user_uri = `/user/${req.params.uid}/get_infor`;
		let user = await AxiosServer.get(ip_1 + user_uri);

		const image_uri = `/image/${user.avatar_image_id}/get`;
		const image = await AxiosServer.get(ip_3 + image_uri);

		delete user.avatar_image_id;
		user = {...user, image: image};
		res.send(user);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

// Get list of user that can be friend with requested user
const getUnfriends = async (req, res) => {
	try {
		const uri = `/user/${req.params.uid}/friend/get_not`;
		const users = await AxiosServer(ip_1 + uri);

		// Get image from  Image service and assign it to user
		await Promise.all(users.map(async (user, index) => {
			const image_uri = `/image/${user.avatar_image_id}/get`; 
			const image = await AxiosServer.get(ip_3 + image_uri);
			delete users[index].avatar_image_id;
			users[index] = {...user, image: image};
		}))

		res.json(users);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

const getFriends = async (req, res) => {
	try {
		const uri = `/user/${req.params.uid}/friend/get`;
		const friends = await AxiosServer.get(ip_1 + uri);

		await Promise.all(friends.map(async (friend, index) => {
			const image_uri = `/image/${friend.avatar_image_id}/get`; 
			const image = await AxiosServer.get(ip_3 + image_uri);

			delete friends[index].avatar_image_id;
			friends[index] = {...friend, image: image};
		}))

		res.send(friends);
	} catch (err) {
		console.log(err);
		const status = err.status ? err.status : 500;
		const message = err.data ? err.data : '';
		res.status(status).send(message);
	}
};

const getInvitations = async (req, res) => {
	try {
		const uri = `/user/${req.params.uid}/invitation/get`;
		const invitations = await AxiosServer.get(ip_1 + uri);
		res.json(invitations);
	} catch (err) {
		res.status(err.status).send(err.message);
	}
};

const getImage = async (req, res) => {
	try {
		const uri = `/user/getImage/${req.params.uid}`;
		const image = await AxiosServer.get(ip_1 + uri);
		res.send(image);
	} catch (err) {
		consolo.log(err);
		res.status(err.status).json(err.message);
	}
};

const declineInvitation = async (req, res) => {
	try {
		const uri = '/user/invitation/delete';
		await AxiosServer.post(ip_1 + uri, req.body);
		res.sendStatus(200);
	} catch (err) {
		res.status(err.status).send(err.message);
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

const getInformationById = async (uid) => {
	try {
		const user_uri = `/user/${uid}/get_infor`;
		let user = await AxiosServer.get(ip_1 + user_uri);

		const image_uri = `/image/${user.avatar_image_id}/get`;
		const image = await AxiosServer.get(ip_3 + image_uri);

		delete user.avatar_image_id;
		delete user.password;
		
		user = {...user, image: image};
		return user;
	}catch(err) {
		console.log(err);
		return null;
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
	declineInvitation,
	getInformationById,
};
