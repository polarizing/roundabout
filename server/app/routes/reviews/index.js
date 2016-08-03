'use strict';
var router = require('express').Router();
module.exports = router;
var Review = require('../../../db/models/review');
var check = require('../check-handler');

router.param('id', function (req, res, next, id) {
    Review.findById(id)
    .then(function (review) {
        req.requestedReview = review;
        next();
    })
    .catch(next);
});


router.get('/:guideId', function(req, res, next){
    Review.findAll({
        where: {
            guideId: req.params.guideId
        }
    })
    .then(function(review){
        res.send(review)
    })
})

router.post('/', check.user, function(req, res, next) {
    Review.create(req.body)
    .then(function(review) {
        res.status(201);
        res.send(review);
    })
    .catch(next);
});

router.delete('/:id', check.admin, function(req, res, next) {
    req.requestedReview.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
    Review.findAll()
    .then(function(reviews) {
        res.send(reviews)
    })
    .catch(next);
});
