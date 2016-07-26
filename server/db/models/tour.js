'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('tour', {
 title: {
   type: Sequelize.STRING,
   allowNull: false
 },

 description: {
   type: Sequelize.STRING,
   allowNull: false
 },

 tags: {
   type: Sequelize.ARRAY(Sequelize.STRING)
 },

 price: {
   type: Sequelize.FLOAT,
   allowNull: false
 },

 tod: {
   type: Sequelize.STRING,
   allowNull: false
 },

 image: {
  type: Sequelize.STRING
 },

 duration: {
   type: Sequelize.INTEGER,
   defaultValue: 60
 },

 expire_in: {
   type: Sequelize.INTEGER,
   defaultValue: 180
 },

 location: {
  type: Sequelize.STRING,
  defaultValue: 'New York City'
 },

 book_by: {
   type: Sequelize.DATE
},

is_booked: {
  type: Sequelize.BOOLEAN,
  defaultValue: false
}

 //guideId will be set when we do tour.belongsTo(user, as guide)


}, {
 hooks: {
   afterValidate: function(tour, options) {
     var currTime = new Date();
     tour.book_by = new Date(currTime.getTime() + tour.expire_in*60000);
   }
 },
 getterMethods: {
   isActive: function() {
     return Date.now() < this.book_by.getTime()
   }
 }
}
)
