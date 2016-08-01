app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('photo', file);
        
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        })
        .success( function (res){
            return res;
        })
        .error(function(err){
            console.error(err);
            console.log('BOOOO');
        });
    }
}]);