const Mapping = require('../models/Mapping');

const createAndSave = async (req, res) => {
	try {
		const { uid, socket_id } = req.body;
		if (!uid || !socket_id) 
			return res.sendStatus(400);

		let mapping = await Mapping.findOne(uid);
		if (!mapping) {
			mapping = new Mapping({
				uid: uid,
				socket_id: socket_id,
			});
			await mapping.save();
		} else {
			mapping.socket_id = socket_id;
			await mapping.update();
		}
		res.send(mapping);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

const findOne = async (req, res) => {
	try {
		const { uid } = req.params;
		res.send(await Mapping.findOne(uid));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

const remove = async (req, res) => {
	try {
		const { uid } = req.body;
		if (!uid) return res.sendStatus(400);
		const mapping = await Mapping.findOne(uid);
		if (mapping) await mapping.delete();
		res.sendStatus(200);
	} catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
};

module.exports = {
	createAndSave,
	findOne,
	remove,
};
