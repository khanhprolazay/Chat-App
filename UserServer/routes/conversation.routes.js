const express = require('express');;
const ConversationController = require('../controllers/ConversationController');
const router = express.Router();

router.post('/message/update', ConversationController.updateLatestMessage);
router.get('/get/:uid', ConversationController.getConversationsByUserId);
router.post('/check', ConversationController.checkConversation);
router.post('/create', ConversationController.createAndSave);

module.exports = router;
