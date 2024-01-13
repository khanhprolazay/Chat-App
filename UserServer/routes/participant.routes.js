const express = require('express');
const ParticipantController = require('../controllers/ParticipantController');
const router = express.Router();

router.post('/addParticipant', ParticipantController.addParticipant)
router.get('/listParticipant/:conversationId', ParticipantController.getParticipantsByConversationId)
router.post('/deleteParticipant', ParticipantController.deleteParticipant);

module.exports = router;
