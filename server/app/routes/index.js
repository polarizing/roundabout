'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/tours', require('./tours'));
router.use('/bookings', require('./bookings'));
router.use('/reviews', require('./reviews'));
router.use('/tags', require('./tags'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
