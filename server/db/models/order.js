'use strict';
var Sequelize = require('sequelize');


var db = require('../_db');


module.exports = db.define('order', {
	date: {
		type: Sequelize.DATE,
		isNull: false,
		defaultValue: Sequelize.NOW
	}

},
{
	getterMethods:{//needs to be tested

		totalPrice: function(){
			var total = 0;
			if(!this.orderId){
				total = undefined;
			} else {
				this.orderId.forEach(function(booking){
					total += booking.price;
				})
			}

			return total;
		}
	}
});