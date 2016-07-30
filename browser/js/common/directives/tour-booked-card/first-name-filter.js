app.filter('getFirstName', function () {
  // function that's invoked each time Angular runs $digest()
  // pass in `item` which is the single Object we'll manipulate
  return function(data) {
			if(!data) return data;
			data = data.split(' ');
    		return data[0];
  };
});