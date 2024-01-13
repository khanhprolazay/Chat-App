const client = require('../config/cassandra.js');

class Mapping {
	constructor({ uid, socket_id }) {
		this.uid = uid;
		this.socket_id = socket_id;
	}

	async save() {
		const query =
			'INSERT INTO service_1.mapping (uid, socket_id) VALUES (?, ?)';
		const params = [this.uid, this.socket_id];
		await client.execute(query, params, { prepare: true });
	}

	async update() {
		const query = 'UPDATE service_1.mapping SET socket_id = ? WHERE uid = ?';
		const params = [this.socket_id, this.uid];
		await client.execute(query, params, { prepare: true });
	}

	async delete() {
		const query = 'DELETE FROM service_1.mapping WHERE uid = ?';
		const params = [this.uid];
		await client.execute(query, params, { prepare: true });
	}

	static async findOne(uid) {
		try {
      // console.log(uid)
			const query = 'SELECT * from service_1.mapping WHERE uid = ? LIMIT 1';
			const params = [uid];
			const result = await client.execute(query, params, { prepare: true });
			const row = result.first();
			return row ? new Mapping(row) : null;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}

module.exports = Mapping;
