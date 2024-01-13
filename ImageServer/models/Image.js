const client = require('../config/cassandra.js');

class Image {
	constructor({ iid, link, data }) {
		this.iid = iid;
		this.link = link;
		this.data = data;
	}

	save = async () => {
		const query =
			'INSERT INTO service_3.images (iid, link, data) VALUES (?, ?, ?)';
		const params = [this.iid, this.link, this.data];
		await client.execute(query, params, { prepare: true });
	};

	update = async () => {
		const query =
			'UPDATE service_3.images SET link = ?, data = ?  WHERE iid = ?';
		const params = [this.link, this.data, this.iid];
		await client.execute(query, params, { prepare: true });
	};

	delete = async () => {
		const query = 'DELETE FROM service_3.images WHERE iid = ?';
		const params = [this.iid];
		console.log(true);
    await client.execute(query, params, { prepare: true });
	};

	static findImageById = async (image_id) => {
		const query = 'SELECT * FROM service_3.images WHERE iid = ?';
		const params = [image_id];
		const result = await client.execute(query, params, { prepare: true });
		const row = result.first();
		return row ? new Image(row) : null;
	};
}

module.exports = Image;
