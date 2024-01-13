const client = require('../config/cassandra.js');

class Friend {
  constructor({ user_1, user_2, cid, is_checked }) {
    this.user_1 = user_1;
    this.user_2 = user_2;
    this.cid = cid;
    this.is_checked = is_checked;
  }

  async save() {
    const query = 'INSERT INTO service_1.friends (user_1, user_2, cid, is_checked) VALUES (?, ?, ?, ?)';
    const params = [this.user_1, this.user_2, this.cid, this.is_checked];
    await client.execute(query, params, { prepare: true });
  }

  async update() {
    const query = 'UPDATE service_1.friends SET cid = ?, is_checked = ? WHERE user_1 = ? and user_2 = ?';
    const params = [this.cid, this.is_checked, this.user_1, this.user_2];
    await client.execute(query, params, { prepare: true });
  }

  async delete() {
    const query = 'DELETE FROM service_1.friends WHERE user_1 = ? and user_2 = ?';
    const params = [this.user_1, this.user_2];
    await client.execute(query, params, { prepare: true });
  }

  static async getUserFriend(uid) {
    const query = 'SELECT user_2 as uid, cid, is_checked FROM service_1.friends WHERE user_1 = ?';
    const params = [uid];
    const result = await client.execute(query, params, { prepare: true });
    return result.rows;
  }

  static async findOne(user_1, user_2) {
    const query = 'SELECT * FROM service_1.friends WHERE user_1 = ? AND user_2 = ? LIMIT 1';
    const params = [user_1, user_2];
    const result = await client.execute(query, params, { prepare: true });
    const row = result.first();
    return row ? new Friend(row) : null;
  }

  static async getPersonalConversation(uid) {
    const query = 'SELECT cid from service_1.friends WHERE user_1 = ?';
    const params = [uid];
    const result = await client.execute(query, params, { prepare: true });
    return result.rows;
  }

  static async getPersonalConversationByUidAndCid(uid, cid) {
    const query = 'SELECT * FROM service_1.friends WHERE user_1 = ? and cid = ?';
    const params = [uid, cid];
    const result = await client.execute(query, params, { prepare: true });
    return result.rows;
  }

  static async getPersonalConversationBetween(user_1, user_2) {
    const query = 'SELECT cid from service_1.friends WHERE user_1 = ? and user_2 = ?';
    const params = [user_1, user_2];
    const result = await client.execute(query, params, { prepare: true });
    return result.rows;
  }
}

module.exports = Friend;
