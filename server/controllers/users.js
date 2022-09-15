var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Create a user
router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    console.log(req.body)
    user.save(function(err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
});

//GET all users
router.get('/api/users', function(req, res, next) {

    Users.find(function(err, users) {
        if (err) { 
            return next(err); 
        }
        res.json({'users': users });
    });

});


// Retrieve information from a user
router.get('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        } else {
            res.json(user);
        }
    });
});

router.patch('/api/users/:id', function(req, res) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({"message": "User not found"});
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
        }
    );
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
        }
    );
});

/*// I don't think we post any exercise information inside user object. Maybe we don't need this at all.
// 
// Add an exercise to the saved exercise list
router.post('/api/users/:user_id/saved_exercises', function(req, res, next){
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
*/

// Or could it be something like this? /Mijin
router.post('/api/users/:id/saved_exercises', function(req, res){
    var id = req.params.user_id;
    var exercise = req.body.exercise;

    User.findById(id, function(err, user) {
        if (err) { return res.status(404).json({'message': 'User not found!', 'error': err}); }
        if (user === null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        if (exercise ===  null) {
            return res.status(404).json(
                {"message": "Exercise not found"});

        }
        if(user.SavedExercises.includes(exercise)){
            return res.status(409).json({'message': 'Exercise already saved in the list'});
        } 
        user.SavedExercises.push(exercise);
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
        } else {
            res.json(user);
        }
    });
});


// maybe we need this as well? /Mijin
router.delete('/api/users/:user_id/saved_exercises/exercise_id', function(req, res){
    var user_id = req.params.user_id;
    var exercise_id = req.params.exercise_id;

    User.findById(user_id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json(
                {"message": "User not found"});
        } try {
            let index = user.SavedExercises.indexOf(exercise_id);
            user.SavedExercises.splice(index, 1);
            user.save();
            res.json(user);
        }
        catch(error) {
            return res.status(404).json({'message': 'Not valid exercise ID', 'error': error});
        }
        });
    });


module.exports = router;