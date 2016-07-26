'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Tag = require('../../../db/models/tag');

router.param('id', function (req, res, next, id) {
    Tag.findById(id)
    .then(function (tag) {
        req.requestedTag = tag;
        next();
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
    req.requestedTag.reload()
    .then(function(tag) {
        res.send(tag);
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
    Tag.findOrCreate({
        where: {
            name: req.body.name
        }
    })
    .then(function(tag) {
        res.status(201);
        res.send(tag);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
    req.requestedTag.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
    Tag.findAll()
    .then(function(tags) {
        res.send(tags)
    })
    .catch(next);
});
