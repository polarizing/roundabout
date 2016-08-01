'use strict';
var crypto = require('crypto');
var Sequelize = require('sequelize');
var _ = require('lodash');


var db = require('../_db');

module.exports = db.define('user', {
   name: {
       type: Sequelize.STRING,
   },
   photo: {
       type: Sequelize.STRING,
   },
   email: {
       type: Sequelize.STRING,
       isNull: false
   },
   password: {
       type: Sequelize.STRING,
       isNull: false
   },
   salt: {
       type: Sequelize.STRING
   },
   phone: {
       type: Sequelize.STRING
   },
   is_admin: {
       type: Sequelize.BOOLEAN,
       defaultValue: false
   },
   twitter_id: {
       type: Sequelize.STRING
   },
   facebook_id: {
       type: Sequelize.STRING
   },
   google_id: {
       type: Sequelize.STRING
   }
}, {
   instanceMethods: {
       sanitize: function () {
           return _.omit(this.toJSON(), ['password', 'salt']);
       },
       correctPassword: function (candidatePassword) {
           return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
       }
   },

   getterMethods: {
       avgRating: function() {
        if (this.reviews && this.reviews.length) return (this.reviews.reduce((prev, curr) => prev.rating + curr.rating))/this.reviews.length;
        else return -1
       },

      numReviews: function() {
        if (this.reviews) return this.reviews.length;
        else return 0
      }
   },

   classMethods: {
       generateSalt: function () {
           return crypto.randomBytes(16).toString('base64');
       },
       encryptPassword: function (plainText, salt) {
           var hash = crypto.createHash('sha1');
           hash.update(plainText);
           hash.update(salt);
           return hash.digest('hex');
       }
   },
   hooks: {
       beforeValidate: function (user) {
           if (user.changed('password')) {
               user.salt = user.Model.generateSalt();
               user.password = user.Model.encryptPassword(user.password, user.salt);
           }
       }
   }
});
