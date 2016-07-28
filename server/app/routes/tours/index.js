'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Tour = require('../../../db/models/tour');
var Guide = require('../../../db/models/user');
var check = require('../check-handler');


router.param('id', function (req, res, next, id) {
    Tour.findOne({where: {id: id}, include: [{model: Guide, as: 'guide'}]})
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

router.post('/', check.user, function(req, res, next) {
    Tour.create(req.body)
    .then(function(tour) {
        res.status(201);
        res.send(tour);
    })
    .catch(next);
});

router.put('/:id', check.admin, function(req, res, next) {
    req.requestedTour.update(req.body)
    .then(function (tour) {
        res.send(tour);
    })
    .catch(next);
});

router.delete('/:id', check.admin, function(req, res, next) {
    req.requestedTour.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
    console.log('QUERY OBJECT', req.query);
    if (Object.keys(req.query).length === 0) {
        Tour.findAll({include: [{model: Guide, as: 'guide'}]})
        .then(function(tours) {
            tours = tours.filter(tour => tour.timeLeft > 0)
            res.send(tours)
        })
        .catch(next);
    }
    else {
        console.log('QUERRRY OBJECT', req.query);
        Tour.findAll({where: { 
                            $or: [
                                {
                                    title: {
                                        $iLike: '%' + req.query.query + '%'
                                    }
                                },
                                {
                                    description: {
                                        $iLike: '%' + req.query.query + '%'
                                    }
                                },
                                {
                                    tags: {
                                        $contains: [req.query.query]
                                    }
                                }
                            ]
                        },include: [{model: Guide, as: 'guide'}]})
                .then(function(tours) {
                    console.log('TOURRRS', tours);
                    tours = tours.filter(tour => tour.timeLeft > 0)
                    res.send(tours)
                })
                .catch(next);
    }
});
