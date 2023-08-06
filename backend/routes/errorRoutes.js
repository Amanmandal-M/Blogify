const express = require('express');
const errorController = require('../controllers/errorController');

const errorRouter = express.Router();

// Catch all invalid routes
errorRouter.get('*', errorController.renderErrorPage);

module.exports = errorRouter;
