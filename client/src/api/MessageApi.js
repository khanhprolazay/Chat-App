import AxiosClient from 'api/AxiosClient';

class MessageApi {
  getConversationMessage = async (cid) => {
    const url = `/message/conversation/${cid}/get`;
    return await AxiosClient.get(url);
  }
}

export default new MessageApi();