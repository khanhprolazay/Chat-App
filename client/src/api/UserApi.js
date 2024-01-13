import AxiosClient from 'api/AxiosClient';

class UserApi {
	find = async (username) => {
		const url = `/user/${username}/get`;
		return await AxiosClient.get(url);
	};

	findById = async (uid) => {
		const url = `/user/${uid}/get_infor`;
		return await AxiosClient.get(url);
	};

	getUnfriends = async (uid) => {
		const url = `/user/${uid}/friend/get_not`;
		return await AxiosClient.get(url);
	};

	getFriends = async (uid) => {
		const url = `/user/${uid}/friend/get`;
		return await AxiosClient.get(url);
	}

	getInvitations = async (uid) => {
		const url = `/user/${uid}/invitation/get`;
		return await AxiosClient.get(url);
	};

	getImage = async (uid) => {
		const url = '/user/getImage';
		return await AxiosClient.get(url + `/${uid}`);
	};

	declineInvitation = async (invitation) => {
		const url = '/user/invitation/decline';
		const body = { invitation: invitation };
		return await AxiosClient.post(url, body);
	};

	acceptInvitation = async (sender_id, receiver_id) => {
		const url = '/user/invitation/accept';
		const body = { sender_id: sender_id, receiver_id: receiver_id };
		return await AxiosClient.post(url, body);
	};

}

export default new UserApi();
