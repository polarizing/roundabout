var expect = require('chai').expect;
var assert = require('better-assert');
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var supertest = require('supertest');

describe('Reviews Route', function() {

    var app, User, Review;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

    beforeEach('Create review', function(done) {
        Review = db.model('review');

        Review.create({
            title: 'review',
            content: 'it was aight'
        })
        .then(function(review) {
            done()
        })
    });

    describe('Unauthenticated request', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should not be able to post', function (done) {
			guestAgent.post('/api/reviews')
				.expect(401)
				.end(done);
		});

	});

    describe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};

		beforeEach('Create a user', function (done) {
			return User.create(userInfo).then(function (user) {
                done();
            }).catch(done);
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		it('should get all reviews with 200 response and with an array as the body', function (done) {
			loggedInAgent.get('/api/reviews').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});

        it('should get one review with 200 response and with an array as the body', function (done) {
			loggedInAgent.get('/api/reviews/1').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('object');
				done();
			});
		});

	});

})
