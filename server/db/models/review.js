'use strict';
var Sequelize = require('sequelize');
var _ = require('lodash');

var db = require('../_db');

module.exports = db.define('review', {
	title: {
		type: Sequelize.STRING,
		isNull: false
	},
	content: {
		type: Sequelize.STRING,
		isNull: false
	},
	rating: {
		type: Sequelize.INTEGER
	}
});