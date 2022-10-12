var express = require('express');
var router = express.Router();
var Muscle = require('../models/muscle');
var Exercise = require('../models/exercise');

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
    Muscle.findById(id, function(err, muscle) {
        if (err) { return next(err); }
        if (muscle === null) {
            return res.status(404).json({'message': 'Muscle not found!'});
        }
        res.json({'Muscle' : muscle});
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

//Get all exercises related to a specific muscle
router.get('/api/muscles/:id/exercises', function(req, res, next) {
    var id = req.params.id;
    Muscle.findById(id, function(err, muscle) {
        if (err) { return next(err); }
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


module.exports = router;