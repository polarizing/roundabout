'use strict';
var router = require('express').Router();
module.exports = router;
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
    console.log("in routes")
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
        // DEFAULT GET ALL TOURS, INCLUDING GUIDE MODEL AND FILTER BY TIMELEFT + ACTIVE
    if (Object.keys(req.query).length === 0) {
            Tour.findAll({include: [{model: Guide, as: 'guide'}]})
            .then(function(tours) {
                tours = tours.filter(tour => tour.timeLeft > 0 && tour.isActive)
                res.send(tours)
            })
            .catch(next);
    }
    else {
        // GET ALL TOURS -- NO FILTER IS TRUE, RETURNS ALL TOURS
        if (req.query.options.noFilter) {
            Tour.findAll()
                .then(function (tours) {
                    res.send(tours);
                })
        }
        // GET ALL TOURS MATCHING TITLE, DESC, OR TAGS
        else {
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
                    tours = tours.filter(tour => tour.timeLeft > 0 && tour.isActive)
                    res.send(tours)
                })
                .catch(next);
        }
    }
});
