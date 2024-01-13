const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

router.post('/delete', MessageController.remove);
router.post('/create', MessageController.createAndSave);
router.get('/conversation/:cid/get', MessageController.getMessageByConversationId);

module.exports = router;
