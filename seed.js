/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chance = require('chance')();
var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Promise = require('sequelize').Promise;

const numUsers = 100;
const emails = chance.unique(chance.email, numUsers);

// Does a function N times and pushes result to array. 
function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto () {
    var g = chance.pick(['men', 'women']);
    var n = chance.integer({min: 0, max: 99});
    return 'https://randomuser.me/api/portraits/' + g + '/' + n + '.jpg'
}

function randUser () {
    return User.build({
        name: [chance.first(), chance.last()].join(' '),
        photo: randPhoto(),
        email: emails.pop(),
        password: chance.word(),
        phone: chance.phone(),
        is_admin: chance.weighted([true, false], [5, 95])
    });
}

function generateUsers() {
    var users = doTimes(numUsers, randUser);
    users.push(User.build({
        name: 'Ishaan',
        photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAARNAAAAJDQyYzJkYjljLTFmZDYtNGY3My1iYmI0LTdmNWNmYjkwZTdiOQ.jpg',
        email: 'ishaan@gmail.com',
        password: 'ishaan',
        phone: '(718) 762-6752',
        is_admin: true
    }));
    return users;
}

function createUsers () {
    return Promise.map(generateUsers(), user => user.save());
}

function seed () {
    return createUsers();
}

db.sync({ force: true })
    .then(function () {
        return seed();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
