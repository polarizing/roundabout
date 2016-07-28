'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');
var Guide = db.model('user')

module.exports = db.define('tour', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.TEXT,
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

    image: {
        type: Sequelize.STRING
    },

    duration: {
        type: Sequelize.INTEGER,
        defaultValue: 60
    },

    expire_in: {
        type: Sequelize.INTEGER,
        defaultValue: 180
    },

    location: {
        type: Sequelize.STRING,
        defaultValue: 'New York City'
    },

    book_by: {
        type: Sequelize.DATE
    },

    is_booked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }


}, {
    hooks: {
        afterValidate: function(tour, options) {
            var currTime = new Date();
            tour.book_by = new Date(currTime.getTime() + tour.expire_in * 60000);
        }
    },
    getterMethods: {
        isActive: function() {
            return Date.now() < this.book_by.getTime()
        },

        timeLeft: function() {
          return Math.round((this.book_by.valueOf() - (new Date()).valueOf())/60000)
        }
    }
})
