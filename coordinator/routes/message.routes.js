const auth = require('./auth');
const router = require('express').Router();
const MessageController = require('../controllers/MessageController');

router.get('/conversation/:cid/get', auth.verify, MessageController.getMessageByConversationId)
module.exports = router;