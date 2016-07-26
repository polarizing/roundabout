'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Tour = require('./models/tour');
var Booking = require('./models/booking');
var Review = require('./models/review');
var Tag = require('./models/tag');

User.hasMany(Tour);
User.hasMany(Booking);
User.hasMany(Review);

Tour.hasMany(Tag)
Tour.hasOne(Booking);
Tour.hasOne(Review);
Tour.belongsTo(User, { as: 'Guide'});

Booking.belongsTo(Tour);
Booking.belongsTo(User);

Review.belongsTo(Tour);
Review.belongsTo(User);

Tag.belongsToMany(Tour);
