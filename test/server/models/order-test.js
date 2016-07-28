var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var Order = db.model('order');
var Booking = db.model('booking');

describe('Order model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    var createBookings = function(){
    	return Booking.bulkCreate([
    		{price: 12, orderId: 1}, 
    		{price: 20, orderId: 1}, 
    		{price: 20, orderId: 1}])
    }

    var createOrder = function(){
    	return Order.create({}, {
    		include: [{model: Booking, as: 'bookings'}]
    	})
    }

    describe('totalPrice Method', function(){

    // 	it('works', function(){
    // 		createBookings().then(function(){
    // 			return createOrder()
    // 		}).then(function(order){
    // 			console.log('_______________________________', order.totalPrice);
    // 			expect(order.totalPrice).to.be.equal(51);
    // 		});
    // 	})
    // })


   

});

