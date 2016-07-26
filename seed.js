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
var Review = db.model('review');
var Tour = db.model('tour');
var Booking = db.model('booking');
var Tag = db.model('tag');
var Promise = require('sequelize').Promise;

const numUsers = 100;
const numTours = 30;
const numBookings = 10;
const numReviews = 10;
const emails = chance.unique(chance.email, numUsers);

// Does a function N times and pushes result to array. 
function doTimes(n, fn) {
    var results = [];
    while (n--) {
        results.push(fn());
    }
    return results;
}

// GENERATE RANDOM USERS

function randUserPhoto() {
    var g = chance.pick(['men', 'women']);
    var n = chance.integer({ min: 0, max: 99 });
    return 'https://randomuser.me/api/portraits/' + g + '/' + n + '.jpg'
}

function randUser() {
    return User.build({
        name: [chance.first(), chance.last()].join(' '),
        photo: randUserPhoto(),
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

function createUsers() {
    return Promise.map(generateUsers(), user => user.save());
}

// GENERATE RANDOM REVIEWS

function randReviewTitle() {
    return chance.sentence({ words: 6 })
}

function randReviewRating() {
    return chance.integer({ min: 0, max: 5 });
}

function randReviewContent() {
    return chance.paragraph({ sentences: 1 });
}

function randReview(bookings) {
    var booking = bookings.pop();
    return Review.build({
        title: randReviewTitle(),
        content: randReviewContent(),
        rating: randReviewRating(),
        userId: booking.userId,
        guideId: booking.guideId
    });
}

function generateReviews(bookings) {
    return doTimes(numReviews, function() {
        return randReview(bookings);
    })
}

function createReviews(bookings) {
    return Promise.map(generateReviews(bookings), review => review.save());
}

// END RANDOM REVIEW GENERATION

// RANDOM TOURS

function randTourTitle() {
    return chance.sentence({ words: 6 })
}

function randTourDescription() {
    return chance.paragraph({ sentences: 1 })
}

function randTourTags() {
    var tags = ['cycling', 'museum', 'neighborhood', 'park', 'show', 'biking', 'food',
                'nightlife', 'watersports', 'history', 'monuments', 'architecture',
                'engineering', 'bridges', 'comedy', 'wine tasting', 'MTA', 
                'transportation', 'airports', 'shipping docks', 'technology', 
                'retail', 'shopping', 'walking', 'cruise', 'antique', 'art', 'street food', 
                'nice guy', 'bad girl', 'helicopter', 'photography', 'music', 'festival',
                'fishing', 'hunting', 'hiking', 'sailing', 'cemetery', 'beer', 'brewery',
                'barhop', 'circus', 'sightseeing', 'water taxi', 'family', 'horse riding',
                'rafting', 'shows', 'clubbing', 'trolling', 'amusement park']
    return [...new Array(5)].map(_ => chance.pick(tags));
}

function randTourPrice() {
    return chance.integer({ min: 10, max: 50 })
    console.log(chance.floating({ min: 10, max: 50, fixed: 2 }))
    return chance.floating({ min: 10, max: 50, fixed: 2 });
}

function randTourTimeOfDay() {
    return chance.pick(['morning', 'afternoon', 'evening'])
}

function randTourDuration() {
    return chance.pick([60, 90, 120, 150, 180, 210, 240, 270, 300])
}

function randExpireIn() {
    return chance.pick([15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180])
}

function randTour(createdUsers) {
    var user = chance.pick(createdUsers);
    return Tour.build({
        title: randTourTitle(),
        description: randTourDescription(),
        tags: randTourTags(),
        price: randTourPrice(),
        tod: randTourTimeOfDay(),
        duration: randTourDuration(),
        expire_in: randExpireIn(),
        guideId: user.id,
    });
}

function generateTours(createdUsers) {
    return doTimes(numTours, function() {
        return randTour(createdUsers);
    })
}

function createTours(createdUsers) {
    return Promise.map(generateTours(createdUsers), tour => tour.save());
}

// END RANDOM TOUR GENERATION

// RANDOM BOOKINGS

function randBooking(users, tours) {
    var tour = tours.pop();
    var user = chance.pick(users)

    return tour.update({is_booked: true})
        .then(_tour => 
            Booking.build({
            price: _tour.price,
            date: new Date(),
            userId: user.id,
            tourId: _tour.id,
            guideId: _tour.guideId
        }))
}

function generateBookings(users, tours) {
    return doTimes(numBookings, function() {
        return randBooking(users, tours);
    })
}

function createBookings(users, tours) {
    return Promise.map(generateBookings(users, tours), booking => booking.save(), {concurrency: 1 })
}

// END RANDOM BOOKINGS

// CREATE TAGS

function generateTags() {
    var tags = ['cycling', 'museum', 'neighborhood', 'park', 'show', 'biking', 'food',
                'nightlife', 'watersports', 'history', 'monuments', 'architecture',
                'engineering', 'bridges', 'comedy', 'wine tasting', 'MTA', 
                'transportation', 'airports', 'shipping docks', 'technology', 
                'retail', 'shopping', 'walking', 'cruise', 'antique', 'art', 'street food', 
                'nice guy', 'bad girl', 'helicopter', 'photography', 'music', 'festival',
                'fishing', 'hunting', 'hiking', 'sailing', 'cemetery', 'beer', 'brewery',
                'barhop', 'circus', 'sightseeing', 'water taxi', 'family', 'horse riding',
                'rafting', 'shows', 'clubbing', 'trolling', 'amusement park']

    tags = tags.map( tag => Tag.build({
        name: tag
    }));
    return tags;
}

function createTags() {
    console.log('hi');
    return Promise.map(generateTags(), tag => tag.save());
}

// END CREATE TAGS

function seed() {
    var _users;
    var _tours;
    var _bookings;
        // create users
    return createUsers()
        // create tours
        .then(function(users) {
            _users = users;
            return createTours(_users);
        })
        // create bookings
        .then(function(tours) {
            _tours = tours;
            _tours = chance.shuffle(_tours)
            return createBookings(_users, _tours)
        })
        // create reviews
        .then(function (bookings) {
            _bookings = bookings;
            return createReviews(_bookings);
        })
        // create tags
        .then(function (reviews) {
            console.log('hi')
            return createTags();
        })
}

db.sync({ force: true })
    .then(function() {
        return seed();
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });
