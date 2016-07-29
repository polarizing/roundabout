'use strict'


function makeTour(){
	return {
		id: 1,
		title: 'Williamsburg Brooklyn Food',
		description: 'Chinatown Food Tour Take a step back in time and explore on of Manhattan’s best preserved neighborhoods! NYC’s Chinatown is the largest Chinatown in the western hemisphere. The neighborhood is home to an eclectic mix of people from all over Asia and is one of the most vibrant and exciting neighborhoods in the city. With hundreds of restaurants and historical sites there is no shortage of things to do. On this tour we explore ethnic, historical sites and sample foods that give this area its unique texture. The narrow, tenement-lined streets of Chinatown tell the story of Manhattan’s former dark side. See how this area, once filled with gambling dens, opium dens, and notorious gangsters became Manhattan’s fastest growing neighborhood. We’ll discuss the original Gangs of New York and the Chinese Tong wars of the 20th Century. We even make stops in the 1st Buddhist Temple on the East Coast and a store that sells $300 chopsticks! We’ll wind through the tiny streets and sample unique foods that can only be found in this neighborhood like fresh beef jerky that is so tender it literally melts in your mouth. We’ll try Chinatown staples like fresh roasted pork buns right out of the oven. If you’re a foodie this tour offers several stops that have lit the food blogs on fire including soup dumplings and Thai style ice cream. Sample an array of dried fruits and dried fish and visit the most notorious dumpling house in the city! Be sure to check out our self-guided tour of Chinatown to learn more about the district and our tour stops. Also, check out our daily SoHo, Little Italy and Chinatown Tour. - See more at: http://www.freetoursbyfoot.com/new-york-tours/food-tours/free-chinatown-food-tour/#sthash.w9oTyE7B.dpuf',
		tags: ["bad girl", "brewery","food",'MTA','helicopter'],
		price: Math.floor(Math.random() * 10),
		tod: 'evening',
		image: 'http://traveltamed.com/wp-content/uploads/2012/05/new-york-walking-tour.jpg',
		duration: Math.floor(Math.random() * 100),
		expire_in: Math.floor(Math.random() * 200),
		location: 'New York City',
		book_by: '2016-07-29 13:40:54.237-04',
		is_booked: true,
		guideId: 75
	}
}

function makeTours (){
	var tours = new Array(10);
	for(var i = 0; i < tours.length; i++){
		tours[i] = makeTour();
	}
	return tours;
}

xdescribe('tour factory methods', function () {
	beforeEach(module('FullstackGeneratedApp'));
	var Tour, $httpBackend, fakeReqTour, fakeResTour, $rootScope;

	beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    fakeReqTour = makeTour();
    fakeResTour= {
        id: 1,
		title: 'Williamsburg Brooklyn Food',
		description: 'Chinatown Food Tour Take a step back in time and explore on of Manhattan’s best preserved neighborhoods! NYC’s Chinatown is the largest Chinatown in the western hemisphere. The neighborhood is home to an eclectic mix of people from all over Asia and is one of the most vibrant and exciting neighborhoods in the city. With hundreds of restaurants and historical sites there is no shortage of things to do. On this tour we explore ethnic, historical sites and sample foods that give this area its unique texture. The narrow, tenement-lined streets of Chinatown tell the story of Manhattan’s former dark side. See how this area, once filled with gambling dens, opium dens, and notorious gangsters became Manhattan’s fastest growing neighborhood. We’ll discuss the original Gangs of New York and the Chinese Tong wars of the 20th Century. We even make stops in the 1st Buddhist Temple on the East Coast and a store that sells $300 chopsticks! We’ll wind through the tiny streets and sample unique foods that can only be found in this neighborhood like fresh beef jerky that is so tender it literally melts in your mouth. We’ll try Chinatown staples like fresh roasted pork buns right out of the oven. If you’re a foodie this tour offers several stops that have lit the food blogs on fire including soup dumplings and Thai style ice cream. Sample an array of dried fruits and dried fish and visit the most notorious dumpling house in the city! Be sure to check out our self-guided tour of Chinatown to learn more about the district and our tour stops. Also, check out our daily SoHo, Little Italy and Chinatown Tour. - See more at: http://www.freetoursbyfoot.com/new-york-tours/food-tours/free-chinatown-food-tour/#sthash.w9oTyE7B.dpuf',
		tags: ["bad girl", "brewery","food",'MTA','helicopter'],
		price: fakeReqTour.price,
		tod: 'evening',
		image: 'http://traveltamed.com/wp-content/uploads/2012/05/new-york-walking-tour.jpg',
		duration: fakeReqTour.duration,
		expire_in: fakeReqTour.expire_in,
		location: 'New York City',
		book_by: '2016-07-29 13:40:54.237-04',
		is_booked: true,
		guideId: 75
    };
  }));

  afterEach(function(){
    try {
      $httpBackend.verifyNoOutstandingExpectation(false);
      $httpBackend.verifyNoOutstandingRequest();
    } catch (err) {
      this.test.error(err);
    }
  });

  it('.fetchAll() works', function(done){
  	var fakeTours = makeTours();
  	$httpBackend.expectGET('/api/tours')
  	.respond(200, fakeTours);
  	Tour.fetchAll()
  		.then(function(tours){
  			expect(tours).to.deep.equal(fakeTours);
  		})
  		.catch(done);
  		$httpBackend.flush();
  		done();
  })

  xit('.queryAll() works', function(){

  })

  xit('.fetch() works', function(){

  })

  xit('.attachGuide() works', function(){

  })

  xit('.attachGuide() works', function(){

  })

 });