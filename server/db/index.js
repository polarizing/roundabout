'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Tour = require('./models/tour');
var Booking = require('./models/booking');
var Review = require('./models/review');
var Tag = require('./models/tag');

User.hasMany(Tour, {foreignKey: 'guideId'});
User.hasMany(Booking, {foreignKey: 'userId'});
User.hasMany(Booking, {foreignKey: 'guideId'});
User.hasMany(Review, {foreignKey: 'guideId'}); // guide is being reviewed
User.hasMany(Review, {foreignKey: 'userId'}); // user is reviewing

Tour.hasOne(Booking, {foreignKey: 'tourId'});
Tour.belongsTo(User, {as: 'guide'});

Booking.belongsTo(Tour, {as: 'tour'});
Booking.belongsTo(User, {as: 'user'});
Booking.belongsTo(User, {as: 'guide'});

Review.belongsTo(User, {as: 'guide'});
Review.belongsTo(User, {as: 'user'});
