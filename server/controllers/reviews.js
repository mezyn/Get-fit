var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var User = require('../models/user');
var Exercise = require('../models/exercise');


// create review
router.post('/api/users/:user_id/exercises/:exercise_id/reviews', function(req, res, next){
    var exercise_id = req.params.exercise_id;
    var user_id = req.params.user_id;
    var review = new Review(req.body);
    User.findById(user_id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        } else {
            Exercise.findById(exercise_id, function(err, exercise) {
                if (err) { return next(err); }
                if (exercise === null) {
                    return res.status(404).json({'message': 'Exercise not found!'});
                }
                review.save(function(err, review) {
                    if (err) { return next(err); }
                    res.status(201).json(review);
                })
                exercise.Reviews.push(review);
                exercise.save();
            });
            user.AuthoredReviews.push(review);
            user.save();
        }
    });

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

//Delete a review (from admin's side)
router.delete('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findOneAndDelete({_id: id}, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        res.json(`Review ${review} has been successfully deleted.`);/*
        if (err) {       
            return res.status(409).json({
            message: 'Review not deleted!', 'error': err
        }); }
        if (review === null) {
            return res.status(404).json(
                {'message': 'Post not found'}
                )}
        //res.json(review);*/
    });
});


module.exports = router;