const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise');
const Review = require('../models/review');
const Muscle = require('../models/muscle');

//For Collection
//Create Exercise

router.post('/api/exercises', function(req, res) {
    var exerciseToAdd = new Exercise(req.body);
    Exercise.find({Name: req.body.Name}, function(err, exercise){
        if(err){
            return res.status(500).json({
                message: 'Exercise not saved due to internal server error'
            });
        }
        if(exercise.length >= 1){
            return res.status(409).json({
                message: 'There is already an exercise with this name'
            });
        }
        exerciseToAdd.save(function(err, newExercise) {
            if (err) {             
                return res.status(500).json({
                    message: 'Exercise not saved due to internal server error'
                }); 
            }
            res.status(201).json(newExercise);
        });
    });
});

// Get all exercises
// Also, filter exercises by their DifficultyScore (filtering)

router.get('/api/exercises', function(req, res, next) {
    var queryInput = req.query.difficultyscore;
    if (!queryInput){
        Exercise.find(function(err, exercises) {
        if (err) { return next(err); }
        res.status(200).json({'exercises': exercises });
        }
    )} else {
        Exercise.find({"DifficultyScore" : queryInput}, function(err, exercises) {
            if (err) {return next(err);}
         res.status(200).json({'Exercises' : exercises})
        })
    }
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
        res.status(200).json(exercise);
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
        exercise.DifficultyScore = (req.body.DifficultyScore|| exercise.DifficultyScore);
        exercise.TipsAndTricks= (req.body.TipsAndTricks|| exercise.TipsAndTricks);

        exercise.save();
        res.status(200).json(exercise);
    });
});

//Deletes all exercises
router.delete('/api/exercises', function(req, res) {
    Exercise.deleteMany({}, function(err, exercises) {
        if (err) {
            return res.status(409).json({ message: 'Exercises not deleted, because of:', 'error': err}); 
        }
        if (exercises === null) {
            return res.status(404).json({'message': 'Exercises not deleted'});
        }
        res.status(200).json(exercises);
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
        res.status(200).json(`Exercise with ID ${id} has been successfully deleted.`);
    });
});

// For Relationships

// Get reviews inside a relevant exercise
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
        res.status(200).json(exercise.Reviews);
    });
});

// Get list of muscles that are related to this specific exercise
router.get('/api/exercises/:id/muscles', function(req, res, next) {
    var id = req.params.id;
    Exercise.findById(id, function(err, exercise) {
        if (err) { return next(err); }
    })
    .populate('Muscles')
    .then(exercise => {
        if (exercise === null) {
            return res.status(404)('Exercise not found!');
        }
        if (exercise.Muscles === null) {
            return res.status(404)('No muscles for this exercise found!');
        }
        res.status(200).json(exercise.Muscles);
    });
});

module.exports = router;