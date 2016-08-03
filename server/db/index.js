'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Tour = require('./models/tour');
var Booking = require('./models/booking');
var Review = require('./models/review');
var Tag = require('./models/tag'); //needed for node seed
var Order = require('./models/order')
var Conversation = require('./models/conversation');
var Line = require('./models/line');

User.hasMany(Tour, {foreignKey: 'guideId'});
User.hasMany(Booking, {foreignKey: 'userId'});
User.hasMany(Booking, {foreignKey: 'guideId'});
User.hasMany(Review, {foreignKey: 'userId'});
User.hasMany(Review, {foreignKey: 'guideId'}); // guide is being reviewed
// user is reviewing

// apparently "include" works with belongsTo and not hasMany
Review.belongsTo(User, {as: 'guide'})
Review.belongsTo(User, {as: 'user'})

Tour.hasOne(Booking, {foreignKey: 'tourId'});
Tour.belongsTo(User, {as: 'guide'});

Booking.belongsTo(Tour, {as: 'tour'});
Booking.belongsTo(User, {as: 'user'});
Booking.belongsTo(User, {as: 'guide'});
Booking.belongsTo(Order, {as: 'order'});

Order.hasMany(Booking, {as: 'bookings'});
Order.belongsTo(User, {as: "user"});

Conversation.hasMany(Line, {foreignKey: 'conversationId'});
Line.belongsTo(User, {as: 'user'});
