'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Tour = require('../../../db/models/tour');

router.param('id', function (req, res, next, id) {
    Tour.findById(id)
    .then(function (tour) {
        req.requestedTour = tour;
        next();
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
    req.requestedTour.reload()
    .then(function(tour) {
        res.send(tour);
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
    Tour.create(req.body)
    .then(function(tour) {
        res.status(201);
        res.send(tour);
    })
    .catch(next);
});

router.put('/:id', function(req, res, next) {
    req.requestedTour.update(req.body)
    .then(function (tour) {
        res.send(tour);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
    req.requestedTour.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
    Tour.findAll()
    .then(function(tours) {
        res.send(tours)
    })
    .catch(next);
});
