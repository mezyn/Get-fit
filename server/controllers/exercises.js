var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');
var Review = require('../models/review');

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
// Get specific exercise
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

// delete exercise
router.delete('/api/exercises/:id', function(req, res, next) {
    var id = req.params.id;
    Exercise.findOneAndDelete({_id: id}, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise === null) {
            return res.status(404).json({'message': 'Exercise not found'});
        }
        res.json(exercise);
    });
});

// For Relationships
// Post individual review inside relevant exercise
router.post('/api/exercises/:id/reviews', function(req, res, next){
    var review = new Review(req.body);
    review.save(function(err, review) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
});

// 4.3.b. Get individual review inside relevant exercise
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
            res.json(review);
        });
    });
});
    
module.exports = router;