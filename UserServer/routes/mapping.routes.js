const MappingController = require('../controllers/MappingController');
const Router = require('express').Router();

Router.post('/create', MappingController.createAndSave);
Router.get('/:uid/get', MappingController.findOne);
Router.post('/delete', MappingController.remove);

module.exports = Router;