'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('conversation', {
	traveller: {
		type: Sequelize.INTEGER
	},
	guide: {
		type: Sequelize.INTEGER
	},
	tourId: {
		type: Sequelize.INTEGER
	}
});
