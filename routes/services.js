const
    express = require('express'),
    router = express.Router(),
    IndexController = require('../controllers/IndexController.js'),
    mongoose = require('../db/mongoose'),
    ServicesModel = require('../models/ServicesModel')(mongoose),
    ServicesController = require('../controllers/ServicesController')(ServicesModel);

router.get('/', ServicesController.getAll.bind(ServicesController));

router.post('/', ServicesController.create.bind(ServicesController));

module.exports = router;
