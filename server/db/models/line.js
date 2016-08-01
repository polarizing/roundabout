'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('line', {
	content: {
		type: Sequelize.TEXT
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
