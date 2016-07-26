'use strict';
var Sequelize = require('sequelize');
var _ = require('lodash');

var db = require('../_db');

module.exports = db.define('booking', {
	price: {
		type: Sequelize.INTEGER
	},
	date: {
		type: Sequelize.DATE
	}
});
