const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const InvitationController = require('../controllers/InvitationController');

router.get('/:username/get', UserController.findUser);
router.get('/:uid/get_infor', UserController.findUserById);
router.get('/:uid/image/get', UserController.getImage);
router.get('/:uid/invitation/get', UserController.getInvitations);
router.get('/:uid/friend/get_not', UserController.getUnfriends);
router.get('/:uid/friend/get', UserController.getFriends);
// router.post('/invitation/decline', UserController.declineInvitation);
router.post('/invitation/create', InvitationController.createAndSave);
router.post('/invitation/delete', UserController.deleteInvitation);


module.exports = router;


