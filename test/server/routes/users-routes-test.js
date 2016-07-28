var expect = require('chai').expect;
var assert = require('better-assert');
var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('User routes', function() {

    var app, User;

    beforeEach('Sync DB', function() {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

    describe('Unauthenticated request', function() {

        var guestAgent;

        beforeEach('Create guest agent', function() {
            guestAgent = supertest.agent(app);
        });

        it('should not be able to delete a user', function(done) {
            guestAgent.delete('/api/users/1')
                .expect(401)
                .end(done);
        });

    });

    describe('Authenticated request', function() {

        var loggedInAgent;

        var userInfo = {
            name: 'Ishaan',
            email: 'joe@gmail.com',
            password: 'shoopdawoop',
            id: 1
        };

        beforeEach('Create a user', function(done) {
            return User.create(userInfo).then(function(user) {
                done();
            }).catch(done);
        });

        beforeEach('Create loggedIn user agent and authenticate', function(done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(userInfo).end(done);
        });

        it('should get all users with 200 response and with an array as the body', function(done) {
            loggedInAgent.get('/api/users/').expect(200).end(function(err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                done()
            });
        });

        it('should get one user with 200 response and with an object as the body', function(done) {
            loggedInAgent.get('/api/users/1').expect(200).end(function(err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('object');
                assert(response.body.name == 'Ishaan');
                done();
            });
        });

        describe('User information', function() {
            var Booking = db.model('booking');
            var Tour = db.model('tour');
            var Review = db.model('review');

            beforeEach(function() {
                Tour.create({
                        title: 'Hello',
                        description: 'NYC TOUR',
                        price: 25,
                        tod: 'Evening',
                        guideId: 2
                    })
                    .then(function(tour) {
                        return Booking.create({
                            tourId: tour.id,
                            guideId: tour.guideId,
                            userId: 1,
                            price: tour.price
                        })
                    })
                    .then(function(booking) {
                        return Review.create({
                            title: 'review',
                            content: 'it was aight',
                            userId: booking.userId,
                            guideId: booking.guideId,
                            rating: 4
                        })
                    })
                    .then(function(booking) {
                        done()
                    })
            })

            it('should get tours', function(done) {
                loggedInAgent
                    .get('/api/users/1/tours')
                    .expect(200)
                    .end(done);
            });

            it('should get bookings', function(done) {
                loggedInAgent
                    .get('/api/users/1/bookings')
                    .expect(200)
                    .end(done);
            });

            it('should get tours', function(done) {
                loggedInAgent
                    .get('/api/users/1/tours')
                    .expect(200)
                    .end(done);
            });

        })

    });

    describe('Admin request', function() {

        var AdminAgent;

        var userInfo = {
            name: 'Harrison',
            email: 'harry@gmail.com',
            password: 'shoopdawoop',
            is_admin: true
        };

        beforeEach('Create an admin', function(done) {
            return User.create(userInfo).then(function(user) {
                done();
            }).catch(done);
        });

        beforeEach('Create loggedIn user agent and authenticate', function(done) {
            AdminAgent = supertest.agent(app);
            AdminAgent.post('/login').send(userInfo).end(done);
        });

        it('should be able to delete a user', function(done) {
            AdminAgent
                .delete('/api/users/1')
                .expect(204)
                .end(done);
        });
    })

    //===========================================================
    // ** Authentication should not belong to user routes **
    //===========================================================

    // describe('Creating new users', function() {
    //
    //     it('should create a new user', function(done) {
    //         guestAgent
    //             .post('/api/users/')
    //             .send({
    //                 name: 'Voldy',
    //                 email: 'horcrux@hogwarts.edu',
    //                 password: 'its_a_riddle,get_it?'
    //             })
    //             .expect(201)
    //             .end(function(err, res) {
    //                 assert(res.body.id == 3);
    //                 assert(res.body.name == 'Voldy');
    //                 done()
    //             });
    //     });
    //
    //     it('should get update the user just created', function(done) {
    //         guestAgent
    //             .put('/api/users/2')
    //             .send({
    //                 name: 'Tom Riddle'
    //             })
    //             .expect(200)
    //             .end(function(err, res) {
    //                 assert(res.body.id == 2);
    //                 assert(res.body.name == 'Tom Riddle');
    //                 done()
    //             })
    //     })
    //
    // });

});
