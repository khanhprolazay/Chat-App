const client = require('../config/cassandra.js');

class Conversation {
	constructor({
		cid,
		title,
		creator_id,
		created_at,
		updated_at,
		lasted_message_content,
		lasted_message_time,
		type,
	}) {
		this.cid = cid;
		this.title = title;
		this.creator_id = creator_id;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.lasted_message_content = lasted_message_content;
		this.lasted_message_time = lasted_message_time
		this.type = type;
	}

	async save() {
		const query =
			'INSERT INTO service_1.conversations (cid, title, creator_id, created_at, updated_at, lasted_message_content, lasted_message_time, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
		const params = [
			this.cid,
			this.title,
			this.creator_id,
			this.created_at,
			this.updated_at,
			this.lasted_message_content,
			this.lasted_message_time,
			this.type,
		];
		await client.execute(query, params, { prepare: true });
	}

	async update() {
		const query = 'UPDATE service_1.conversations SET title = ?, creator_id = ?, created_at = ?, updated_at = ?, lasted_message_content = ?, lasted_message_time = ?, type = ? WHERE cid = ?';
		const params = [
			this.title,
			this.creator_id,
			this.created_at,
			this.updated_at,
			this.lasted_message_content,
			this.lasted_message_time,
			this.type,
			this.cid,
		];
		await client.execute(query, params, { prepare: true });
	}

	async delete() {
		const query = 'DELETE FROM service_1.conversations WHERE cid = ?';
		const params = [this.cid];
		await client.execute(query, params, { prepare: true });
	}

	static async findAll() {
		const query = 'SELECT * FROM service_1.conversations';
		const result = await client.execute(query);
		const conversations = result.rows.map((row) => new Conversation(row));
		return conversations;
	}

	static async findByCid(cid) {
		const query = 'SELECT * FROM service_1.conversations WHERE cid = ?';
		const params = [cid];
		const result = await client.execute(query, params, { prepare: true });
		const row = result.rows[0]
		return row ? new Conversation(row) : {};
	}

}

module.exports = Conversation;
