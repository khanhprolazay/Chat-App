import AxiosClient from 'api/AxiosClient';

class ConversationApi {
  getUserConversations = async (uid) => {
    const url = `/conversation/get/${uid}`;
		return await AxiosClient.get(url);
  }
}

export default new ConversationApi();