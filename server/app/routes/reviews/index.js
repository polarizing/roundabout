'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Review = require('../../../db/models/review');

router.param('id', function (req, res, next, id) {
    Review.findById(id)
    .then(function (review) {
        req.requestedReview = review;
        next();
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {//user and admin
    req.requestedReview.reload()
    .then(function(review) {
        res.send(review);
    })
    .catch(next);
});

router.post('/:id', function(req, res, next) {//user
    Review.create(req.body)
    .then(function(review) {
        res.status(201);
        res.send(review);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) { //admin/user
    req.requestedReview.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

router.get('/', function(req, res, next) { //admin
    Review.findAll()
    .then(function(reviews) {
        res.send(reviews)
    })
    .catch(next);
});
