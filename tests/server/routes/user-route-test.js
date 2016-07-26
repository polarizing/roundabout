var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('User routes', function () {

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

  describe('Getting users', function () {

    it('should get all users', function (done) {
      guestAgent
        .get('/api/users/')
        .expect(function(res) {
          res.body.length = 2
        })
        .expect(200)
        .end(done);
    });

    it('should get a particular user', function(done) {
      guestAgent.get('/api/users/1')
        .expect(function(res) {
          res.body.id = 1
          res.body.name = 'Ishaan'
        })
        .expect(200)
        .end(done)
    })

  });

  describe('Creating new users', function () {

    it('should create a new user', function (done) {
      guestAgent
        .post('/api/users/')
        .send({name: 'Voldy', email: 'horcrux@hogwarts.edu', password: 'its_a_riddle,get_it?'})
        .expect(function(res) {
          console.log(res.body)
          res.body.id = 3,
          res.body.name = 'Voldy'
        })
        .expect(201)
        .end(done);
    });

    xit('should get a particular user', function(done) {
      guestAgent.get('/api/users/1')
        .expect(function(res) {
          res.body.id = 1
          res.body.name = 'Ishaan'
        })
        .expect(200)
        .end(done)
    })

  });



});
