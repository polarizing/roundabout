var expect = require('chai').expect;
var assert = require('better-assert');
var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

var app, User, guestAgent;

beforeEach('Sync DB', function () {
  return db.sync({ force: true });
});

beforeEach('Create app', function (done) {
  app = require('../../../server/app')(db);
  User = db.model('user');

  User
  .create({name: 'Ishaan', email: 'ishaan@nagpal.com', password: 'kittycat'})
  .then(function() {
    return User.create({name: 'Kevin', email: 'kevinTheDestroyer@richBoyChina.com', password: 'youcantstopme'})
  })
  .then(function() {
    guestAgent = supertest.agent(app);
    done();
  })

});


xdescribe('User routes', function () {

  xdescribe('Getting users', function () {

    xit('should get all users', function (done) {
      guestAgent
      .get('/api/users/')
      .expect(200)
      .end(function(err, res) {
        assert(res.body.length == 2)
        done()});
    });

    xit('should get a particular user', function(done) {
      guestAgent.get('/api/users/1')
      .expect(200)
      .end(function(err, res) {
        assert(res.body.id == 1);
        assert(res.body.name == 'Ishaan');
       done()
      })
    })

  });

  xdescribe('Creating new users', function () {

    xit('should create a new user', function (done) {
      guestAgent
      .post('/api/users/')
      .send({name: 'Voldy', email: 'horcrux@hogwarts.edu', password: 'its_a_riddle,get_it?'})
      .expect(201)
      .end(function(err, res){
        assert(res.body.id == 3);
        assert(res.body.name == 'Voldy');
        done()});
    });

    xit('should get update the user just created', function(done) {
      guestAgent
      .put('/api/users/2')
      .send({name: 'Tom Riddle'})
      .expect(200)
      .end(function(err, res){
        assert(res.body.id == 2);
        assert(res.body.name == 'Tom Riddle');
        done()})
    })

  });

  xdescribe('Deleting Users', function () {
    xit('should delete a user', function (done) {
      guestAgent
      .delete('/api/users/2')
      .expect(204)
      .end(done);
    });
  });

   xdescribe('Getting other info from users', function () {
    var Booking = db.model('booking');
    var Tour = db.model('tour');
    var Review = db.model('review');
    var _tour;

    beforeEach(function(done) {
      Tour.create({title: 'Hello', description: 'NYC TOUR', price: 25, tod: 'Evening', guideId: 1})
      .then(function(tour) {
        _tour = tour;
        return Booking.create({tourId: tour.id, guideId: tour.guideId, userId: 2, price: tour.price})
      })
      .then(function(booking) {
        return Review.create({title: 'review', content: 'it was aight', userId: booking.userId, guideId: booking.guideId, rating: 4})
      })
      .then(function(booking) {
        done()
      })
    })

    xit('should get tours', function (done) {
      guestAgent
      .get('/api/users/1/tours')
      .expect(200)
      .end(done);
    });

    xit('should get bookings', function (done) {
      guestAgent
      .get('/api/users/1/bookings')
      .expect(200)
      .end(done);
    });

    xit('should get tours', function (done) {
      guestAgent
      .get('/api/users/1/tours')
      .expect(200)
      .end(done);
    });


  });



});
