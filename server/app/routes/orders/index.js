'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Order = require('../../../db/models/order');
var check = require('../check-handler');

router.param('id', function (req, res, next, id) {
    Order.findById(id)
    .then(function (order) {
        req.requestedOrder = order;
        next();
    })
    .catch(next);
});

router.get('/:id', check.admin, function(req, res, next) {
    req.requestedOrder.reload()
    .then(function(order) {
        res.send(order);
    })
    .catch(next);
});

router.post('/', check.user, function(req, res, next) {
    Order.create(req.body)
    .then(function(order) {
        res.status(201);
        res.send(order);
    })
    .catch(next);
});

router.delete('/:id', check.admin, function(req, res, next) {
    req.requestedOrder.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

router.get('/', check.admin, function(req, res, next) {
    Order.findAll()
    .then(function(orders) {
        res.send(orders)
    })
    .catch(next);
});
