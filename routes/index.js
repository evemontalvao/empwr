const
    express = require('express'),
    router = express.Router(),
    IndexController = require('../controllers/IndexController'),
    services = require('./services'),
    path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/view/index.html'))
})

router.use('/services', services);

module.exports = router;
