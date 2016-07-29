'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('booking', {
	price: {
		type: Sequelize.INTEGER
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
