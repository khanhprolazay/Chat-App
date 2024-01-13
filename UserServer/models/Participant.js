const client = require('../config/cassandra.js');

  class Participant {
    constructor({ conversation_id, user_id, type, created_at, updated_at }) {
      this.conversation_id = conversation_id;
      this.user_id = user_id;
      this.type = type;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }

    async save() {
      const query = 'INSERT INTO service_1.participants (conversation_id, user_id, type, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';
      const params = [this.conversation_id, this.user_id, this.type, this.created_at, this.updated_at];
      await client.execute(query, params, { prepare: true });
    }

    static async findAll() {
      const query = 'SELECT * FROM service_1.participants';
      const result = await client.execute(query);
      const participants = result.rows.map(row => new Participant(row));
      return participants;
    }
    
    static async findByUserId(userId) {
      const query = 'SELECT * FROM service_1.participants WHERE user_id = ? ALLOW FILTERING';
      const params = [userId];
      const result = await client.execute(query, params, { prepare: true });
      return result.rows;
    }

    static async getGroupConversationByUserId(userID) {
      const query = 'SELECT conversation_id as cid FROM service_1.participants WHERE user_id = ? ALLOW FILTERING';
      const params = [userID];
      const result = await client.execute(query, params, { prepare: true });
      return result.rows;
    }

    async delete() {
      const query = 'DELETE FROM service_1.participants WHERE conversation_id = ? AND user_id = ?';
      const params = [this.conversation_id, this.user_id];
      await client.execute(query, params, { prepare: true });
    }
  }



  module.exports = Participant;
