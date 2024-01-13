const InvitationController = require('../controllers/InvitationController');
const router = require('express').Router();

router.post('/create', InvitationController.createAndSave);
router.post('/delete', InvitationController.remove)

module.exports = router;