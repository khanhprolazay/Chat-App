const client = require('../config/cassandra.js');

class User {
	constructor({
		uid,
		phone,
		username,
		password,
		is_active,
		updated_at,
		created_at,
		display_name,
		avatar_image_id,
	}) {
		this.uid = uid;
		this.phone = phone;
		this.username = username;
		this.password = password;
		this.is_active = is_active;
		this.updated_at = updated_at;
		this.created_at = created_at;
		this.display_name = display_name;
		this.avatar_image_id = avatar_image_id;
	}

	async save() {
		const query =
			'INSERT INTO service_1.users (uid, username, password, display_name, avatar_image_id, phone, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		const params = [
			this.uid,
			this.username,
			this.password,
			this.display_name,
			this.avatar_image_id,
			this.phone,
			this.is_active,
			this.created_at,
			this.updated_at,
		];
		await client.execute(query, params, { prepare: true });
	}

	async delete() {
		const query = 'DELETE FROM service_1.users WHERE uid = ?';
		const params = [this.uid];
		await client.execute(query, params, { prepare: true });
	}

	static async getAllUser() {
		const query =
			'SELECT uid, username, display_name, avatar_image_id FROM service_1.users';
		const result = (await client.execute(query, {}, { prepare: true })).rows;
		return result;
	}

	static async findByUid(uid) {
		const query =
			'SELECT * FROM service_1.users WHERE uid = ?';
		const params = [uid];
		const result = await client.execute(query, params, { prepare: true });
		const row = result.first();
		return row ? new User(row) : null;
	}

	static async findByUsername(username) {
		const query = 'SELECT * FROM service_1.users WHERE username = ?';
		const params = [username];
		const result = await client.execute(query, params, { prepare: true });
		const row = result.first();
		return row ? new User(row) : null;
	}

	static async findByUsernameAndPassword(username, password) {
		const query =
			'SELECT * FROM service_1.users WHERE username = ? and password = ? ALLOW FILTERING';
		const params = [username, password];
		const result = await client.execute(query, params, { prepare: true });
		const row = result.first();
		return row ? new User(row) : null;
	}
	
}

module.exports = User;
