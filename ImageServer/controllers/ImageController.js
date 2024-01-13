const Image = require('../models/Image');
const uuid = require('uuid');
const zlib = require('zlib');

const getImageById = async (req, res) => {
	try {
		const { iid } = req.params;
		if (!iid) return res.sendStatus(400);
		const image = await Image.findImageById(iid);
		res.status(200).json(image);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Error getting messages' });
	}
};

const createAndSave = async (req, res) => {
	try {
		const { iid, link } = req.body;
		if (!iid) return res.sendStatus(400);

		const image = req.file
			? new Image({ iid: iid, link: link, data: req.file.buffer })
			: new Image({ iid: iid, link: link, data: null });
		await image.save();
		res.status(200).json(image);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
};

const remove = async (req, res) => {
	try {
		const { iid } = req.body;
		const image = await Image.findImageById(iid);
		if (image) await image.delete();
		res.sendStatus(200);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	remove,
	getImageById,
	createAndSave,
};
