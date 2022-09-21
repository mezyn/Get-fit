var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var User = require('../models/user');
var Exercise = require('../models/exercise');

// create review
/* This doesn't feel correct. When a user want to delete a review, (s)he will first go to the relevant exercise,
and then select a 'create review', instead of directly going to the review page. I'd suggest to change the path as below: 
*/
router.post('/api/reviews', function(req, res, next){
    var review = new Review(req.body);
    review.save(function(err, review) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
});
//I believe it should be something like this //Mijin 

router.post('/api/users/:user_id/exercises/:exercise_id/reviews', function(req, res, next){
    var exercise_id = req.params.exercise_id;
    var user_id = req.body.user_id; //Let's assume that we take user id with request
    var review = new Review(req.body);
    User.findById(user_id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        user.AuthoredReviews.push(review);
        user.save();
    });
    Exercise.findById(exercise_id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise === null) {
            return res.status(404).json({'message': 'Exercise not found!'});
        }
        exercise.Reviews.push(review);
        exercise.save();
    });
    review.save(function(err, review) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
    // maybe we need to do .populate here
    res.json(review);

});


//Get all reviews
router.get('/api/reviews', function(req, res, next) {
    Review.find(function(err, review) {
        if (err) { return next(err); }
        res.json({'reviews': review });
    });
});

//Get a specific review
router.get('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findById(id, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found!'});
        }
        res.json(review);
    });
});

module.exports = router;