'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Booking = require('../../db/models/booking');

router.param('id', function (req, res, next, id) {
    Booking.findById(id)
    .then(function (booking) {
        req.requestedBooking = booking;
        next();
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {//user and admin
    req.requestedBooking.reload()
    .then(function(booking) {
        res.send(booking);
    })
    .catch(next);
});

router.post('/:id', function(req, res, next) {//user
    Booking.create(req.body)
    .then(function(booking) {
        res.status(201);
        res.send(booking);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) { //admin/user
    req.requestedBooking.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

router.get('/', function(req, res, next) { //admin
    Booking.findAll()
    .then(function(bookings) {
        res.send(bookings)
    })
    .catch(next);
});


