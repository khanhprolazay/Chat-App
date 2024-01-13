const auth = require('./auth')
const express = require('express');;
const ConversationController = require('../controllers/ConversationController');
const router = express.Router();

// router.post('/createconvo', ConversationController.createConversation);
router.get('/get/:uid', auth.verify, ConversationController.getConversationsByUserId);

module.exports = router;