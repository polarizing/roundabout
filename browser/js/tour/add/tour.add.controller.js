'use strict';


app.controller('TourAdd', function($scope, Tour, $state, Session, fileUpload, $log) {
    $scope.tour = {
        location: null,
        name: null,
        description: null,
        image: null,
        expire_in:  {
            value: 30,
            options: {
                floor: 0,
                ceil: 1200,
                translate: function(value) {
                    return value;
                }
            }
        },
        price: {
            value: 150,
            options: {
                floor: 0,
                ceil: 450,
                translate: function(value) {
                    return '$' + value;
                }
            }
        },
        duration: {
            value: 90,
            options: {
                floor: 45,
                ceil: 300,
                translate: function(value) {
                    return value;
                }
            }
        },
        tags: [],
        guideId: null

    }

    if (AuthService.isAuthenticated()) {
        $scope.tour.guideId = Session.user.id;
    }
    $scope.addTour = function() {
        // console.log(Session.user.id);
        // $scope.tour.guide = Session.user.id;
        Tour.create($scope.tour)
        .then(function(tour) {
            $state.go('tour', { id: tour.id })
        })
    }

    $scope.uploadFile = function(newfile){
       // console.log('this is the flow thingy', $scope.$flow.files[0])
        $log.info('I am here')
        console.log('hello')
        console.log('passing in the newestfile' , newfile)
        var file = newfile.file;
        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "/upload";

        if (['jpeg', 'png','jpg'].includes(file.name.split(".").pop()) && file.size < 5000000)
            fileUpload.uploadFileToUrl(file, uploadUrl)
                  .then(function (res) {
                    console.log(res.data);
                  });
        else alert('Please upload a valid image of type .jpeg, .png, or .jpg of less than 5MB.')

    };

})
