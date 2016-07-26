'use strict';
var Sequelize = require('sequelize');
var _ = require('lodash');

var db = require('../_db');

module.exports = db.define('tag', {
	name: {
		type: Sequelize.STRING,
		isNull: false
	}
});
