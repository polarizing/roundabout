'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = require('../../../db/models/user');
var Booking = require('../../../db/models/booking');
var Tour = require('../../../db/models/tour');
var Review = require('../../../db/models/review');
// var check = require('../check-handler');

router.param('id', function (req, res, next, id) {
    User.findOne({where: {id: id}, include: [{model: Review, as: 'reviews'}]})
    .then(function (user) {
        req.requestedUser = user;
        next();
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
    req.requestedUser.reload()
    .then(function(user) {
        res.send(user)
    })
    .catch(next);
});

// only admins can access this route, normal users should go to /signup
router.post('/', function(req, res, next) {
    User.create(req.body)
    .then(function(user) {
        res.status(201);
        res.send(user);
    })
    .catch(next);
});

router.put('/:id', function(req, res, next) {
    req.requestedUser.update(req.body)
    .then(function (user) {
        res.send(user);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
    req.requestedUser.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});


router.get('/', function(req, res, next) {
    User.findAll({include: [{model: Review, as: 'reviews'}]})
    .then(function(users) {
        res.send(users)
    })
    .catch(next);
});

// only YOU can see your bookings
router.get('/:id/bookings', function(req, res, next) {
    Booking.findAll({
        where: {
            userId: req.requestedUser.id
        }
    })
    .then(function(bookings) {
        res.send(bookings)
    })
    .catch(next);
});

router.get('/:id/tours', function(req, res, next) {
    Tour.findAll({
        where: {
            guideId: req.requestedUser.id
        }
    })
    .then(function(tours) {
        res.send(tours)
    })
    .catch(next);
});

// show all reviews for a guide
router.get('/:id/reviews', function(req, res, next) {
    Review.findAll({
        where: {
            guideId: req.requestedUser.id
        }
    })
    .then(function(reviews) {
        res.send(reviews)
    })
    .catch(next);
});
