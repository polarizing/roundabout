'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Booking = require('../../../db/models/booking');
var check = require('../check-handler');

router.param('id', function (req, res, next, id) {
    Booking.findById(id)
    .then(function (booking) {
        req.requestedBooking = booking;
        next();
    })
    .catch(next);
});

router.get('/:id', check.admin, function(req, res, next) {
    req.requestedBooking.reload()
    .then(function(booking) {
        res.send(booking);
    })
    .catch(next);
});

router.post('/', check.user, function(req, res, next) {
    Booking.create(req.body)
    .then(function(booking) {
        res.status(201);
        res.send(booking);
    })
    .catch(next);
});

router.delete('/:id', check.admin, function(req, res, next) {
    req.requestedBooking.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

router.get('/', check.admin, function(req, res, next) {
    Booking.findAll()
    .then(function(bookings) {
        res.send(bookings)
    })
    .catch(next);
});
