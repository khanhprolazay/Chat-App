const client = require('../config/cassandra.js');

  class Message {
    constructor({ mid, conversation_id, sender_id, content, image_id, created_at }) {
      this.mid = mid;
      this.conversation_id = conversation_id;
      this.sender_id = sender_id;
      this.content = content;
      this.image_id = image_id;
      this.created_at = created_at;
    }


    save = async () => {
      const query = 'INSERT INTO service_2.messages (mid, conversation_id, sender_id, content, image_id, created_at) VALUES (?, ?, ?, ?, ?, ?)';
      const params = [this.mid, this.conversation_id, this.sender_id, this.content, this.image_id, this.created_at];
      await client.execute(query, params, { prepare: true });
    }

    delete = async () => {
      const query = 'DELETE FROM service_2.messages WHERE mid = ?';
      const params = [this.mid];
      await client.execute(query, params, { prepare: true });
    }
    
    
    static findByConversationId = async (conversation_id) => {
      const query = 'SELECT * FROM service_2.messages WHERE conversation_id = ? ALLOW FILTERING';
      const params = [conversation_id];
      const result = await client.execute(query, params, { prepare: true });
      const messages = result.rows.map(row => new Message(row));
      return messages;
    }
    
    static findAll = async () => {
      const query = 'SELECT * FROM service_2.messages';
      const result = await client.execute(query);
      const messages = result.rows.map(row => new Message(row));
      return messages;
    }

    static findOne = async (mid) => {
      const query = 'SELECT * FROM service_2.messages WHERE mid = ? ALLOW FILTERING';
      const params = [mid];
      const result = await client.execute(query, params, { prepare: true });
      const row = result.first();
      return row ? new Message(row) : null;
    }

  
  }    

  

  module.exports = Message;
