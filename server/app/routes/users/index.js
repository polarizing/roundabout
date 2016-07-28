'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = require('../../../db/models/user');
var Booking = require('../../../db/models/booking');
var Tour = require('../../../db/models/tour');
var Review = require('../../../db/models/review');
var check = require('../check-handler');

router.param('id', function (req, res, next, id) {
    User.findOne({
        where: {
            id: id
        },
        include: [
            { model: Review, as: 'reviews' }
        ]
    })
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

// only YOU can update your profile
router.put('/:id', check.access, function(req, res, next) {
    req.requestedUser.update(req.body)
    .then(function (user) {
        res.send(user);
    })
    .catch(next);
});

// only admins can delete your profile
router.delete('/:id', check.admin, function(req, res, next) {
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

//===================================================
//  only YOU can access/edit/delete your bookings
//===================================================
router.get('/:id/bookings', check.access, function(req, res, next) {
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

router.get('/:id/bookings/:bookingId', check.access, function(req, res, next) {
    Booking.findOne({
        where: {
            userId: req.requestedUser.id,
            id: req.params.bookingId
        }
    })
    .then(function(booking) {
        res.send(booking)
    })
    .catch(next);
});

router.put('/:id/bookings/:bookingId', check.access, function(req, res, next) {
    Booking.findOne({
        where: {
            userId: req.requestedUser.id,
            id: req.params.bookingId
        }
    })
    .then(function(booking) {
        return booking.update(req.body)
    })
    .then(function(updatedBooking) {
        res.send(updatedBooking)
    })
    .catch(next);
});

router.delete('/:id/bookings/:bookingId', check.access, function(req, res, next) {
    Booking.findOne({
        where: {
            userId: req.requestedUser.id,
            id: req.params.bookingId
        }
    })
    .then(function(booking) {
        return booking.destroy()
    })
    .then(function(deletedBooking) {
        res.send(deletedBooking)
    })
    .catch(next);
});

//===================================================
//       only YOU can edit/delete your tours
//===================================================
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

router.put('/:id/tours/:tourId', check.access, function(req, res, next) {
    Tour.findOne({
        where: {
            guideId: req.requestedUser.id,
            id: req.params.tourId
        }
    })
    .then(function(tour) {
        return tour.update(req.body)
    })
    .then(function(tour) {
        res.send(tour)
    })
    .catch(next);
});

router.delete('/:id/tours/:tourId', check.access, function(req, res, next) {
    Tour.findOne({
        where: {
            guideId: req.requestedUser.id,
            id: req.params.tourId
        }
    })
    .then(function(tour) {
        return tour.destroy(req.body)
    })
    .then(function(tour) {
        res.send(tour)
    })
    .catch(next);
});

//===================================================
//      only YOU can edit/delete your reviews
//===================================================
router.put('/:id/reviews/:reviewId', check.access, function(req, res, next) {
    Review.findOne({
        where: {
            userId: req.requestedUser.id,
            id: req.params.reviewId
        }
    })
    .then(function(review) {
        return review.update(req.body)
    })
    .then(function(review) {
        res.send(review)
    })
    .catch(next);
});

router.delete('/:id/reviews/:reviewId', check.access, function(req, res, next) {
    Review.findOne({
        where: {
            userId: req.requestedUser.id,
            id: req.params.reviewId
        }
    })
    .then(function(review) {
        return review.destroy(req.body)
    })
    .then(function(review) {
        res.send(review)
    })
    .catch(next);
})
