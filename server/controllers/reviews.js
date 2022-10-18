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
                    if (review === null) {return res.status(404).json({'message': 'No review to save!'});}
                    res.status(201).json(review);
                })
                review.Author = user_id
                review.Exercise = exercise_id
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
        res.status(200).json({'reviews': review });
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
        res.status(200).json(review);
    });
});

//Deletes all reviews
router.delete('/api/reviews', function(req, res) {
    Review.deleteMany({}, function(err, reviews) {
        if (err) {
            return res.status(409).json({ message: 'Reviews not deleted, because of:', 'error': err}); 
        }
        if (reviews === null) {
            return res.status(404).json({'message': 'Reviews not deleted'});
        }
        res.status(200).json(reviews);
    });
});

//Delete a review (from reviews, user and exercise)
router.delete('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findById(id, function(err, review, next) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        } else {
            var user_id = review.Author;
            var exercise_id = review.Exercise;

            User.findById(user_id, function(err, user, next) {
                if (err) { return next(err); }
                if (user === null) {
                    res.status(404).json({'message': 'User not found'})
                } else {
                    let index = user.AuthoredReviews.indexOf(id);
                    user.AuthoredReviews.splice(index, 1);
                    Exercise.findById(exercise_id, function(err, exercise, next) {
                        if (err) { return next(err); }
                        if (exercise === null) {
                            res.status(404).json({'message': 'Exercise not found'})
                        } else {
                            let index = exercise.Reviews.indexOf(id);
                            exercise.Reviews.splice(index, 1);
                            exercise.save();
                        }
                    });
                    user.save();
                }
            });
            review.delete();
            res.status(200).json(`Review with ID ${id} has been successfully deleted.`);
        }
        /*
        //We definetly need to do some error handling because it crashes when you put in a wrong id
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