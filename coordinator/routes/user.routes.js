const auth = require('./auth');
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/:username/get', auth.verify, UserController.findUser);
router.get('/:uid/get_infor', auth.verify, UserController.findUserById);
router.get('/:uid/image/get', auth.verify, UserController.getImage);
router.get('/:uid/invitation/get', auth.verify, UserController.getInvitations);
router.get('/:uid/friend/get_not', auth.verify, UserController.getUnfriends);
router.get('/:uid/friend/get', auth.verify, UserController.getFriends);
router.post('/invitation/decline', auth.verify, UserController.declineInvitation);


module.exports = router;


