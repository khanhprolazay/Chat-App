const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
	const { username, password, repassword, uid, avatar_image_id } = req.body;

	// Check if the username existed in database
	const find = await User.findByUsername(username);
	if (find || password !== repassword) {
		res.status(400).send("Tên đăng nhập đã tồn tại hoặc mật khẩu không đúng");
		return;
	}

	const newUser = new User({
		uid: uid,
		phone: "",
		is_active: true,
		username: username,
		password: password,
		display_name: username,
		created_at: new Date(),
		updated_at: new Date(),
		avatar_image_id: avatar_image_id,
	});

	try {
		await newUser.save();
		res.status(200).send("Tạo user thành công");
	} catch (err) {
		res.send(err);
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	let user = await User.findByUsernameAndPassword(username, password);

	// If user not existed or the password is wrong, send error to client
	if (!user) {
		return res.status(400).send("Tài khoản không tồn tại hoặc sai mật khẩu");
	}

	// All user informations are right
	// Send token and user information to client
	try {
		const accessToken = jwt.sign(
			{ username: username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "1800s" } // 30p
		);

		const refreshToken = jwt.sign(
			{ username: username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "604800s" } // 7 day
		);

		user = {
			uid: user.uid,
			username: user.username,
			display_name: user.display_name,
			avatar_image_id: user.avatar_image_id,
			phone: user.phone,
		};
		res.json({ user, refreshToken, accessToken });
	} catch (err) {
		res.status(500).send(err);
	}
};

const logout = async (req, res) => {
	if (!req.body.uid) {
		return res.sendStatus(400);
	}
	res.sendStatus(200);
};

const getNewAccessToken = async (req, res) => {
	if (!req.body.refresh_token) {
		return res.sendStatus(400);
	}

	const refreshToken = req.body.refresh_token;
	const username = jwt.decode(refreshToken).username;

	// Verify if refresh token is valid
	// If false => forbidden
	// If true => create new access token and send it
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
		if (err) {
			return res.sendStatus(403);
		}
		const accessToken = jwt.sign(
			{ username: username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "1200s" }
		);
		res.send(accessToken);
	});
};

const deleteUser = async (req, res) => {
	try {
		const { uid } = req.body;
		if (!uid) return res.sendStatus(400);
		const user = await User.findByUid(uid);
		if (user) await user.delete();
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

module.exports = {
	login,
	logout,
	deleteUser,
	createNewUser,
	getNewAccessToken,
};
