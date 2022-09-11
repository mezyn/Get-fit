var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');

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
app.patch('/api/exercises/:id', function(req, res, next) {
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

module.exports = router;