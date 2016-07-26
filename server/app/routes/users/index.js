'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = require('../../db/models/user');

router.param('id', function (req, res, next, id) {
    User.findById(id)
    .then(function (user) {
        req.requestedUser = user;
        next();
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
    req.requestedUser.reload()
    .then(function(user) {
        res.send(user);
    })
    .catch(next);
});

router.post('/:id', function(req, res, next) {
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
    User.findAll()
    .then(function(users) {
        res.send(users)
    })
    .catch(next);
});
