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
    var titles = ['Central Park Sightseeing', 'Bike & Roll NYC', 'Blazing Saddles', 'Bike the Big Apple', 
    'Midtown Manhattan Night Tour', '911 Memorial and Brooklyn Bridge Night Tour', 'Ghost and Dark Side Tours',
    'Sunset on the High Line', 'Central Park', 'Helicopter Tours', 'HeliNY Tours', 'Brooklyn Bridge, Brooklyn Heights and DUMBO',
    'Williamsburg Brooklyn', 'All In One Brooklyn', 'Brooklyn Heights', 'Bushwick Graffiti and Street Art',
    'Brooklyn Bridge and 911 Memorial', 'Williamsburg Graffiti and Street Art', 'Green-wood Cemetery',
    'Flatbush Brooklyn Food Tour', 'Williamsburg Brooklyn Food Tour', 'Park Slope, Gowanus and Prospect Park',
    'Free Tours by Foot', 'East Village Pub Crawl', 'New York Pizza Tour', 'Lower East Side Food Tour',
    'Greenwich Village Food Tour', 'Chinatown Food Tour', 'Harlem Gospel Tour and Soul Food Experience', 
    'Historic New York City Bars', 'Chelsea Market Tour']
    return chance.pick(titles)
}

function randTourImage() {
    var images = ['http://traveltamed.com/wp-content/uploads/2012/05/new-york-walking-tour.jpg',
                'http://www.oscarwildetours.com/wp-content/uploads/2015/05/mm1.jpg',
                'https://media.timeout.com/images/101721143/303/170/image.jpg',
                'https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/5579/SITours/pizza-walking-tour-of-manhattan-in-new-york-city-111612.jpg',
                'http://www.freetoursbyfoot.com/wp-content/uploads/2012/11/New-York-Tours.jpg',
                'http://traveltamed.com/wp-content/uploads/2012/05/rockefeller-center.jpg',
                'http://traveltamed.com/wp-content/uploads/2012/05/coney-island.jpg',
                'http://traveltamed.com/wp-content/uploads/2012/05/new-york-city-ballet.jpg',
                'http://c4.nrostatic.com/sites/default/files/styles/original_image_with_cropping/public/uploaded/pic_giant_052915_SM_Brooklyn-Bridge-DT.jpg?itok=-MTToI9Z']
    return chance.pick(images);
}

function randTourDescription() {
    var descriptions = ['Where can you find a historic Synagogue next to a Bulgarian punk discotheque, trendy boutiques that sit comfortably beside decades-old “Mom and Pop” shops, or tenement apartments interspersed between luxury high rise condos? Look no further than our Lower East Side Food Tour to discover America’s great Melting Pot. The Lower East Side is known for its blend of cultural diversity and rich history. It’s also known for its great food. Our food tasting tour is the perfect way to discover this fascinating neighborhood. Be sure to take a look at our full lineup of New York food tours. Lower East Side Food TourThe streets of the Lower East Side tell the tales of struggling immigrants – Eastern Europeans, Russians, Germans, Puerto Ricans – who came to America in search of opportunity. They brought with them recipes from the ‘old world’ and you can still taste these foods today. Ever eat a potato knish? How about a bialy or pletzel? Care to try a green tea doughnut? Not in the mood for something exotic – no worries – we’ll grab some of the best Chinese dumplings in New York City and we will pick up some pickles along the way. Join Free Tours by Foot as we visit historic synagogues, check out the area’s latest in arts and architecture, learn about life in the tenements and master useful Yiddish phrases, all while refining our palates with delectable treats from around the globe. Be sure to read our quick Guide on the Lower East Side. Food shops we stop at: Yonah Schimmel Knish Bakery Kossar’s Bialy and Bagels North China Dumpling Sugar Sweet Sunshine Bakery The Pickle Guys* *On major Jewish holidays, these shops are closed and we visit other delicious food shops instead. We do make changes to shops for various reasons and we cannot guarantee that all shops listed above will be visited on each tour. Sites we cover on the tour: Orensanz Foundation for the Arts (in the historic Anshe Chesed Synagogue) Orchard Street pedestrian mall Russ and Daughters Doughnut Plant Streit’s Matzoh Factory Economy Candy Katz’s Delicatessen Beth Hemedrash Hagodol Synagogue for more details, check out our self-guided tour. - See more at: http://www.freetoursbyfoot.com/new-york-tours/food-tours/lower-east-side-food-tour/#sthash.nt8i6yYZ.dpuf', 'Greenwich Village is well-known for its shady, winding streets with 19th Century houses, for its bohemian roots and historic Washington Square Park. But the Village’s tree-lined streets are also lined with some of the best restaurants and food specialty shops in all of the Big Apple. Just ask celebrity chefs of the Food Network, food critics from the New York Times and thousands of New Yorkers: Greenwich Village is THE place to find the best of every cuisine. So come along on our pay-what-you-wish Greenwich Village Food Tour and discover for yourself just what makes this neighborhood a foodie destination. Shops and foods we cover on the Greenwich Village Food Tour: Mamoums Falafel Artichoke pizza Bantum Bagels Faiccos Rice Balls Bleecker Street Pizza Molly’s Cupcakes and much more!', 'The East Village boasts more restaurants per capita than almost anywhere else in the world. With an ethnically diverse community, one can find virtually every type of cuisine here. Its unrivaled food is served up with a large side order of history and culture that includes the Dutch years of early New York to the era of Kleindeutschland, when German immigrants dominated the area; from the counter-culture scene of the 1950s and ‘60s to the punk rock explosion of the 1970s. We’ll savor a delicious array of cuisines and flavors including: Hot Dogs & Smoothies from Papaya King Vegan Empanadas Crispy Falafel Pizza Fresh Baked Deserts Davey’s Ice Cream – voted Best Ice cream in NYC Village Voice 2013 And don’t worry – we’ll walk off the calories as we visit these historic and cultural sites: Cooper Union, one of the oldest educational institutions in the United States, where Abraham Lincoln gave his historic 1860 “right makes might” speech Saint Marks Place, famous for its eclectic scene of shops, restaurants and cultural history The Mosaic Trail – National Geographic calls it a “top destination” in New York City The 1831 Hamilton-Holly House, a Registered Landmark The Deutsch-Amerikanische Schuetzen Gesellschaft building Site of the former Fillmore East, where dozens of 1960s rock legends such as Jimi Hendrix, The Who, and Led Zeppelin played St. Mark’s Lutheran Church built in 1847, whose history includes the tragic General Slocum disaster of 1904 Trash and Vaudeville, a New York fashion legend, supplying punk rockers with studded collars and pink hair dye for decades and more! - See more at: http://www.freetoursbyfoot.com/new-york-tours/food-tours/free-east-village-food-tour/#sthash.XmcV9Ctu.dpuf', 'Chinatown Food Tour Take a step back in time and explore on of Manhattan’s best preserved neighborhoods! NYC’s Chinatown is the largest Chinatown in the western hemisphere. The neighborhood is home to an eclectic mix of people from all over Asia and is one of the most vibrant and exciting neighborhoods in the city. With hundreds of restaurants and historical sites there is no shortage of things to do. On this tour we explore ethnic, historical sites and sample foods that give this area its unique texture. The narrow, tenement-lined streets of Chinatown tell the story of Manhattan’s former dark side. See how this area, once filled with gambling dens, opium dens, and notorious gangsters became Manhattan’s fastest growing neighborhood. We’ll discuss the original Gangs of New York and the Chinese Tong wars of the 20th Century. We even make stops in the 1st Buddhist Temple on the East Coast and a store that sells $300 chopsticks! We’ll wind through the tiny streets and sample unique foods that can only be found in this neighborhood like fresh beef jerky that is so tender it literally melts in your mouth. We’ll try Chinatown staples like fresh roasted pork buns right out of the oven. If you’re a foodie this tour offers several stops that have lit the food blogs on fire including soup dumplings and Thai style ice cream. Sample an array of dried fruits and dried fish and visit the most notorious dumpling house in the city! Be sure to check out our self-guided tour of Chinatown to learn more about the district and our tour stops. Also, check out our daily SoHo, Little Italy and Chinatown Tour. - See more at: http://www.freetoursbyfoot.com/new-york-tours/food-tours/free-chinatown-food-tour/#sthash.w9oTyE7B.dpuf', 'Harlem Renaissance and Gospel Music Tour Harlem is known for its uniquely celebrated culture, its profound history, and its illustrious music scene. When you think of Harlem, the arts are on the forefront of your mind. By taking this tour, you will explore the art of song, dance, literature, architecture and even have a chance to appreciate the culinary arts…dare we entice you with some soul food? This Harlem Renaissance and Gospel Music Tour is a two hour neighborhood walking tour with an optional 1 hour musical performance. - See more at: http://www.freetoursbyfoot.com/harlem-gospel-tour/#sthash.QNc9zG5f.dpuf', 'Flatbush Brooklyn Food Tour Flatbush, Brooklyn is a diverse community with hidden, almost suburban architectural features featuring Tudor, St. Ann’s and brownstone homes right square in the middle of Brooklyn. Nestled next to Prospect Park, the sister park to Central Park which is considered the more visually stunning park of the two. Flatbush has a 350 plus year old history dating back to the Dutch and has been home to Irish, Italian, Jewish and now thriving West Indian populations. Speaking of the tropics I bet that you never knew that you can get the best food of the tropics only 25 minutes away from Times Square in this same Flatbush, Brooklyn. Jerk Chicken with meat so tender it nearly falls of the bone straight from the tropical breezes of Jamaica; Tangy, spicy and sweet chickpeas mixed with tamarind and pepper infused with the calypso and steelpan charm of Trinidad; Codfish wrapped in a flaky pastry dough from Haiti with pride; and just to spread the love we even visit a 60 plus year old Italian deli that is a neighborhood institution that also serves damn good pasta. flatbush-food-tour-grilling-the-jerk-chicken Join Free Tours by Foot as we proudly dish you up the best tastes, sights and sounds of the West Indian islands one of the truly hidden neighborhood gems of Brooklyn, Flatbush. You’ll enter a visitor and leave blissfully full and happy saying in your best accent, “that every tiiing is irie!! Read a review for the tour. Places we visit to eat on the Flatbush Brooklyn Food Tour: De Hot Pot (Tugboat Tea CompanyTrinidad) Scoops (Trinidad, Rasta) Peppa’s Jerk Chicken (Jamaica) Fisherman’s cove (Jamaica) Jamaican Pride Bakery Immaculate 2 bakery (Haiti) Mama Louisa’s Hero Shoppe (Italian) Allen’s Bakery (Trinidad) - See more at: http://www.freetoursbyfoot.com/new-york-tours/brooklyn-tours/flatbush-brooklyn-food-tour/#sthash.H4x2w5yV.dpuf', 'Williamsburg Food Tour You have heard the hype, now come see what it’s all about! Williamsburg is home to the Brooklyn Brewery, tons of vintage clothing shops, organic coffee houses and, of course, excellent food. Trendy neighborhood hot-spots combine with historic bakeries and markets to make for a truly diverse eating experience. Try it all on our Williamsburg Food Tour. Join Free Tours by Foot as we lead you on an eating tour through the hippest section of Williamsburg, along Bedford Avenue. You’ll sample one of the city’s best falafel plates, enjoy buttermilk biscuits with honey and jam straight from the farm, taste exclusive Mast Brothers chocolate, visit local cheese shop loved by foodies, and try the unlikely “chicken” drumsticks from a vegan fast food joint that’s distinctly “Brooklyn.” Then take a short walk to South Williamsburg’s Hasidic section for babka and rugelach! Shops we visit on the Williamsburg Food Tour: Oasis Falafel Egg Bedford Cheese Shop Foodswings Kaff’s (Jewish bakery) - See more at: http://www.freetoursbyfoot.com/new-york-tours/food-tours/williamsburg-food-tour/#sthash.bIbA14p4.dpuf', 'Which New York Pub Crawls are Best There is no better way to make friends on a trip to the Big Apple than on a New York pub crawl and there is no better place to get your groove on than the East Village, one of Manhattan’s hottest neighborhoods for late night revelry and outright fun. Our local tour guides know the area inside out and are eager to show you the hot spots, while making sure to protect your budget. - See more at: http://www.freetoursbyfoot.com/best-nyc-pub-crawls/#sthash.0aHGbFns.dpuf', 'New York Pizza Tour NOTE: Our pizza tour is not currently running. However there are other paid options out there. Free Tours by Foot guests get a special price with Scott’s Pizza Tours. Enter FreeByFoot and get $2 off Scott’s tours. Just click the link to be taken to his page. Check out his TripAdvisor reviews. Other pizza tour options can be found on Viator. No trip to New York City would be complete without a great slice of pizza. With over 3000 pizzerias to choose from, you could say that NYC is the Mecca of Pizza. But, with so many choices, how do you decide where to to take the best bites? Well, take a New York Pizza Tour. For our complete offerings, please visit our New York Food Tours page. Let Free Tours by Foot show you where to find some of the most delectable and delicious pizza in the city. Pizza comes in all shapes and flavors and we want you to experience that unforgettable moment when you find the perfect slice for you. That’s why our tour includes three pizzerias, each of which specializes in a different style. In between slices, your guide will lead you through the charming, historic streets of Greenwich Village and SoHo. Save room for dessert. Sites we cover on the tour: Artichoke Pizza Bleeker Street Pizza Lombardi’s Pizza and much more! At the food stops, you will choose what treats you would like to sample (or eat in whole). Try them all or none at all. Unlike other tours that charge around $45 with some excluding food, on this tour, YOU choose what to eat and how much to spend. All recommended items are less than $4. Suggested amount to bring for snacks is $7-10, depending on your appetite! Vegetarian and vegan options available at several shops. - See more at: http://www.freetoursbyfoot.com/new-york-tours/food-tours/free-new-york-pizza-tour/#sthash.MmHaZnsR.dpuf']
    return chance.pick(descriptions)
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
        image: randTourImage(),
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
