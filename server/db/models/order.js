'use strict';
var Sequelize = require('sequelize');
var _ = require('lodash');

var db = require('../_db');


module.exports = db.define('order', {
	date: {
		type: Sequelize.DATE,
		isNull: false
	}

},
{
	getterMethods:{//needs to be tested

		totalPrice: function(){
			var total = 0;

			this.orderId.forEach(function(booking){
				total += booking.price;
			})
			
			return total;
		}
	}
});