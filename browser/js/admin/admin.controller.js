app.controller('Admin', function ($scope, tours, users, Tour, User, Session) {
    // var
    //     nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
    //     familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    $scope.radioModel = 'Tours';

    $scope.tours = tours;
    $scope.removed = false;

    $scope.users = users;
	$scope.itemsByPage=10;

    //remove to the real data holder
    $scope.removeTour = function removeItem(tour) {
        Tour.remove(tour.id);
        console.log(tours.length);
        var index = $scope.tours.indexOf(tour);
        if (index !== -1) {
            $scope.tours.splice(index, 1);
        }
        $scope.removed = true;
        console.log(tours.length);
    }

    $scope.removeUser = function removeItem(user) {
        User.remove(user.id);

        var index = $scope.users.indexOf(user);
        if (index !== -1) {
            $scope.users.splice(index, 1);
        }
    }

    $scope.isAdmin = function (){
        return Session.user.is_admin;
    }

});