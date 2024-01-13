const ImageController = require('../controllers/ImageController');
const router = require('express').Router();
const multer = require('multer');
const upload = multer();

router.post('/delete', ImageController.remove);
router.get('/:iid/get', ImageController.getImageById);
router.post('/create', upload.single('data'), ImageController.createAndSave);

module.exports = router;
