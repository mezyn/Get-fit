var express = require('express');
var router = express.Router();
var Muscle = require('../models/muscle');

//Create muscle
router.post('/api/muscles', function(req, res, next){
    var muscle = new Muscle(req.body);
    muscle.save(function(err, muscle) {
        if (err) { return next(err); }
        res.status(201).json(muscle);
    })
});

//Get all muscle
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
        res.json(muscle);
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
        res.json(muscle);
    });
});


//Update muscle info

router.patch('/muscles/:id', function(req, res, next) {
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

module.exports = router;