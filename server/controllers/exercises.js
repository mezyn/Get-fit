var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');
var Review = require('../models/review');
var Muscle = require('../models/muscle');

//For Collection
//Create Exercise
router.post('/api/exercises', function(req, res, next){
    var exercise = new Exercise(req.body);
    exercise.save(function(err, exercise) {
        if (err) { return next(err); }
        res.status(201).json(exercise);
    })
});

// Get all exercises
router.get('/api/exercises', function(req, res, next) {
    Exercise.find(function(err, exercises) {
        if (err) { return next(err); }
        res.json({'exercises': exercises });
    });
});

// For Individual Items

// Get a specific exercise
router.get('/api/exercises/:id', function(req, res, next) {
    var id = req.params.id;
    Exercise.findById(id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise === null) {
            return res.status(404).json({'message': 'Exercise not found!'});
        }
        res.json(exercise);
    });
});

// Update exercise
router.patch('/api/exercises/:id', function(req, res, next) {
    var id = req.params.id;
    Exercise.findById(id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise == null) {
            return res.status(404).json(
                {"message": "Exercise not found"});
            }
        exercise.Name = (req.body.Name || exercise.Name);
        exercise.AverageRating = (req.body.AverageRating || exercise.AverageRating);
        exercise.DifficultyScore = (req.body.DifficultyScore|| exercise.DifficultyScore);
        exercise.Reviews = (req.body.Reviews|| exercise.Reviews);
        exercise.TipsAndTricks= (req.body.TipsAndTricks|| user.TipsAndTricks);

        exercise.save();
        res.json(exercise);
    });
});

// Delete exercise
router.delete('/api/exercises/:id', function(req, res, next) {
    var id = req.params.id;
    Exercise.findOneAndDelete({_id: id}, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise === null) {
            return res.status(404).json({'message': 'Exercise not found'});
        }
        res.json(`Exercise with ID ${id} has been successfully deleted.`);
    });
});

// For Relationships

// Post a review for a relevant exercise
//This is same as what we have in reviews.js; so having two is redundant. However, I'm not sure if this should be inside exercises.js
//or reviews.js. We can discuss about this to find an optimal solution /Mijin
router.post('/api/exercises/:id/reviews', function(req, res, next){
    var review = new Review(req.body);
    review.save(function(err, review) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
});

// 4.3.b. Get individual review inside a relevant exercise
router.get('/api/exercises/:id/reviews', function(req, res, next) {
    var id = req.params.id;
    Exercise.findById(id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise === null) {
            return res.status(404).json({'message': 'Exercise not found!'});
        }
        if (exercise.Reviews === null) {
            return res.status(404).json({'message': 'No review found!'});
        }
        res.json(exercise.Reviews);
    });
});

// 4.3.c. Get individual review from relevant exercise
router.get('/api/exercises/:exercise_id/reviews/:review_id', function(req, res, next) {
    var exercise_id = req.params.exercise_id;
    var review_id = req.params.review_id;
    Exercise.findById(exercise_id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise === null) {
            return res.status(404).json({'message': 'Exercise not found!'});
        }
        exercise.Reviews.findById(review_id, function(err, review) {
            if (err) { return next(err); }
            if (review === null) {
                return res.status(404).json({'message': 'No review found!'});
            }
        });
        res.json(review);
    });
});

// 4.3.d. Delete a specific review from relevant exercise
router.delete('/api/exercises/:exercise_id/reviews/:review_id', function(req, res, next) {
    var exercise_id = req.params.exercise_id;
    var review_id = req.params.review_id;
    
    Exercise.findById(exercise_id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise === null) {
            return res.status(404).json({'message': 'Exercise not found!'});
        }
        exercise.Reviews.findOneAndDelete({_id: id}, function(err, review) {
            if (err) { return next(err); }
            if (review === null) {
                return res.status(404).json({'message': 'Review not found'});
            }
            res.json(`Review with detail ${review} has been successfully deleted.`);
        });
    });
});

//Get list of muscles that are related to this specific exercise
router.get('/api/exercises/:id/muscles', function(req, res, next) {
    var id = req.params.id;
    Exercise.findById(id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise === null) {
            return res.status(404).json({'message': 'Exercise not found!'});
        }
        if (exercise.Muscles === null) {
            return res.status(404).json({'message': 'No muscles for this exercise found!'});
        }
        res.json(exercise.Muscles);
    });
});
    
module.exports = router;