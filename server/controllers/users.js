var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Create a user
router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
});

//maybe we should implement a get for all users
/*
router.get('/api/users', function(req, res, next) {
    Users.find(function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users });
    });
});
*/

// Retrieve information from a user
router.get('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    });
});

router.patch('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
            }
        user.Email = (user.Email);
        user.Password = (user.Password);
        user.BodyInfo.Gender = (req.body.BodyInfo.Gender|| user.BodyInfo.Gender);
        user.BodyInfo.BodyWeight = (req.body.BodyInfo.BodyWeight|| user.BodyInfo.BodyWeight);
        user.BodyInfo.BodyFat= (req.body.BodyInfo.BodyFat|| user.BodyInfo.BodyFat);
        user.BodyInfo.Age = (req.body.BodyInfo.Age|| user.BodyInfo.Age);
        user.BodyInfo.Height = (req.body.BodyInfo.Height|| user.BodyInfo.Height);
        user.BodyInfo.Goal = (req.body.BodyInfo.Goal|| user.BodyInfo.Goal);

        user.save();
        res.json(user);
    });
});

// Delete a user
router.delete('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});


// not very sure
// Add an exercise to the saved exercise list
router.post('/api/uers/:user_id/exercises/', function(req, res, next){
    var exercise = new Exercise(req.body);
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        } else {
        user.SavedExercises.save(function(err, user) {
            if (err) { return next(err); }
            res.status(201).json(user.SavedExercises);
        })
}
};

module.exports = router;