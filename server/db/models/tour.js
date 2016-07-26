'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

db.define('tour', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false
  },

  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },

  tod: {
    type: Sequelize.STRING,
    allowNull: false
  },

  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 60
  },

  book_by: {
    type: Sequelize.DATE,
    defaultValue: (new Date()).setHours((new Date()).getHours() + 3)
  }

  //guideId will be set when we do tour.belongsTo(user, as guide)


 }, {

  getterMethods: {
    isActive: function() {
      return Date.now() < this.book_by
    }
  }
}



 )


module.exports = db;

