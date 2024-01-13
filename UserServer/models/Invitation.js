const client = require('../config/cassandra.js');

class Invitation {
	constructor({ sender_id, receiver_id }) {
		this.sender_id = sender_id;
		this.receiver_id = receiver_id;
	}

	async save() {
		const query =
			'INSERT INTO service_1.invitations (sender_id, receiver_id) VALUES (?, ?)';
		const params = [this.sender_id, this.receiver_id];
		await client.execute(query, params, { prepare: true });
	}

	async delete() {
		const query =
			'DELETE FROM service_1.invitations WHERE sender_id = ? AND receiver_id = ?';
		const params = [this.sender_id, this.receiver_id];
		await client.execute(query, params, { prepare: true });
	}

	static async findOne(sender_id, receiver_id) {
		const query =
			'SELECT * FROM service_1.invitations WHERE sender_id = ? AND receiver_id = ?';
		const params = [sender_id, receiver_id];
		const rows = await client.execute(query, params, { prepare: true });
		const row = rows.first();
		return row ? new Invitation(row) : null;
	}

	static async findSenderByReceiver(receiver_id) {
		const query = `SELECT * FROM service_1.invitations WHERE receiver_id = ?`;
		const params = [receiver_id];
		const result = await client.execute(query, params, { prepare: true });
		return result.rows;
	}

	static async findReceiverBySender(sender_id) {
		const query = `SELECT * FROM service_1.invitations WHERE sender_id = ?`;
		const params = [sender_id];
		const result = await client.execute(query, params, { prepare: true });
		return result.rows;	
	}

}

module.exports = Invitation;
