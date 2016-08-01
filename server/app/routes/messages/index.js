'use strict';
var router = require('express').Router();
module.exports = router;
var Conversation = require('../../../db/models/conversation');
var Line = require('../../../db/models/line');
var check = require('../check-handler');

router.post('/chat', function (req, res, next) {
    Line.create({content: req.body.content, date: new Date(), conversationId: req.body.conversationId, userId: req.body.userId})
        .then(function (line) {
            res.status(201);
            res.send(line);
        })
        .catch(next);
})

router.post('/conversation', function (req, res, next) {
    Conversation.create({traveller: req.body.travellerId, guide: req.body.guideId, tourId: req.body.tourId})
                .then(function (conversation) {
                    res.status(201);
                    res.send(conversation);
                })
                .catch(next);   
})

router.get('/chat/:id', function (req, res, next) {
    Line.findAll({
        where: { conversationId: req.params.id},
        order: [['updatedAt', 'ASC']]
    })
    .then(function (lines) {
        res.send(lines);
    })
    .catch(next);
})

router.get('/conversation/:id', function (req, res, next) {
    Conversation.findAll({
        where: {
            $or: [
                {
                    traveller: req.params.id
                },
                {
                    guide: req.params.id
                }
            ]
        }
    })
    .then(function (conversations) {
        res.send(conversations);
    })
    .catch(next);
})


router.get('/conversation/traveller/:id', function (req, res, next) {
    Conversation.findAll({
        where: { traveller: req.params.id }
    })
    .then(function (conversation) {
        res.send(conversation);
    })
    .catch(next);
})

router.get('/conversation/guide/:id', function (req, res, next) {
    Conversation.findAll({
        where: { guide: req.params.id }
    })
    .then(function (conversation) {
        res.send(conversation);
    })
    .catch(next);
})
