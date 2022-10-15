var express = require('express');
var router = express.Router();
var Muscle = require('../models/muscle');
var Exercise = require('../models/exercise');
const exercise = require('../models/exercise');

//Create muscle
router.post('/api/muscles', function(req, res, next){
    var muscle = new Muscle(req.body);
    muscle.save(function(err, muscle) {
        if (err) { return next(err); }
        res.status(201).json(muscle);
    })
});

//Get all muscles
router.get('/api/muscles', function(req, res, next) {
    Muscle.find(function(err, muscles) {
        if (err) { return next(err); }
        res.json({'muscles': muscles });
    });
});

//Get a specific muscle
router.get('/api/muscles/:id', function(req, res, next) {
    var id = req.params.id;
    Muscle.findById(id, function(err) {
        if (err) { return next(err); }
    })
    .populate('Exercises')
    .then(muscle => {
        if (muscle === null) {
            return res.status(404).json({'message': 'Muscle not found!'});
        }
        res.json(muscle);
    });
});

//Deletes all muscles
router.delete('/api/muscles', function(req, res) {
    Muscle.deleteMany({}, function(err, muscles) {
        if (err) {
            return res.status(409).json({ message: 'Muscles not deleted, because of:', 'error': err}); 
        }
        if (muscles === null) {
            return res.status(404).json({'message': 'Users not deleted'});
        }
        res.status(200).json(muscles);
    });
});

//Delete a muscle
router.delete('/api/muscles/:id', function(req, res, next) {
    var id = req.params.id;
    Muscle.findOneAndDelete({_id: id}, function(err, muscle) {
        if (err) { return next(err); }
        if (muscle === null) {
            return res.status(404).json({'message': 'Muscle not found'});
        }
        res.json(`Muscle with ID ${id} has been successfully deleted.`);
    });
});


//Update muscle info
router.patch('/api/muscles/:id', function(req, res, next) {
    var id = req.params.id;
    Muscle.findById(id, function(err, muscle) {
        if (err) { return next(err); }
        if (muscle == null) {
            return res.status(404).json({"message": "Muscle not found"});
        }
        muscle.Name = (req.body.Name || muscle.Name);
        muscle.LatinName = (req.body.LatinName || muscle.LatinName);
        muscle.Description = (req.body.Description || muscle.Description);
        //How to handle patching exercises (list of exercises)? Maybe connecting two entities (Muscle & Exercise) can solve the issue? /Mijin
        muscle.Exercises = (req.body.Exercises || muscle.Exercises);

        muscle.save();
        res.json(muscle);
    });
});

// Completely update one muscle
router.put('/api/muscles/:id', function(req, res) {
    const muscle = Muscle.findById(req.params.id);
    if (muscle.id === req.body.id)
        updateMuscle = Muscle.findByIdAndUpdate(req.params.id, {$set: req.body,},{ new: true })
        .then(() => {
            res.status(200).json({
                message: "Muscle updated successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "An error occured",
            });
        });
});

//Get all exercises related to a specific muscle
router.get('/api/muscles/:id/exercises', function(req, res, next) {
    var id = req.params.id;
    Muscle.findById(id, function(err) {
        if (err) { return next(err); }
    })
    .populate('Exercises')
    .then(muscle => {
        if (muscle === null) {
            return res.status(404).json({'message': 'Muscle not found!'});
        }
        if (muscle.Exercises === null) {
            return res.status(404).json({'message': 'No exercises for this muscle found!'});
        }
        // maybe we need to do .populate here
        res.json(`Related exercises to this muscle: ${muscle.Exercises}`);
    });
});

// Add an exercise to the saved exercise list
router.post('/api/muscles/:muscle_id/exercises/:exercise_id', function(req, res){
    var muscle_id = req.params.muscle_id;
    var exercise_id = req.params.exercise_id;

    Muscle.findById(muscle_id, function(err, muscle) {
        console.log(muscle)
        if (err) { 
            return res.status(404).json(
                {'message': 'Muscle not found!', 'error': err}); 
        }
        if (muscle === null) {
            return res.status(404).json(
                {"message": "Muscle not found"});
        }
        if (exercise_id ===  null) {
            return res.status(404).json(
                {"message": "Exercise not found"});
        }
        if(muscle.Exercises.includes(exercise_id)){
            return res.status(409).json({'message': 'Exercise already saved in the list'});
        } 
        Exercise.findById(exercise_id, function(err, exercise) {
            if (exercise === null) {
                return res.status(404).json(
                    {"message": "Exercise not found"});
            } else {
                exercise.Muscles.push(muscle_id)
                exercise.save()
            }
        })
        muscle.Exercises.push(exercise_id);
        // Maybe we need to use 'populate' somewhere here?
        muscle.save();
        return res.status(201).json(muscle);
    });
});


module.exports = router;