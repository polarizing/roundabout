'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('tag', {
	name: {
		type: Sequelize.STRING,
		isNull: false
	}
});
