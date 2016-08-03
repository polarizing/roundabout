'use-strict';

app.factory('Review', function($http) {

    var Review = {};

    Review.create = function(review) {
        return $http.post('/api/reviews', {
                title: review.title,
                content: review.content,
                rating: review.rate,
                userId: review.userId,
                guideId: review.guideId
            })
            .then(res => res.data)
    };

    return Review

})
