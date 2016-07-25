'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Tour = require('./models/tour');
var Booking = require('./models/booking');
var Review = require('./models/review');

User.hasMany('Tour');
User.hasMany('Booking');
User.hasMany('Review');

Tour.hasOne('Booking');
Tour.hasMany('Review');
Tour.belongsTo('User');

Booking.belongsTo('Tour');
Booking.belongsTo('User');

Review.belongsTo('Tour');
Review.belongsTo('User')
