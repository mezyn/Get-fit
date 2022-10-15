var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// do we need two dots instead of one? (same for other controllers) /Mijin
var User = require('../models/user');
var Exercise = require('../models/exercise');
var Review = require('../models/review');
const user = require('../models/user');
const exercise = require('../models/exercise');

router.post('/api/login', function(req, res ) {
    if(req.body.Email && req.body.Password){
        User.findOne({Email: req.body.Email}, function(err, user){
            if(err){
                return res.status(404).json({'message': 'User not found!', 'error': err});
            }
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Please provide valid email and/or password'
                });
            }
            // check whether the password is correct
            bcrypt.compare(req.body.Password, user.Password, function(err, result){
                if(err){
                    return res.status(401).json({
                        message: 'Please provide valid email and/or password'
                    });
                }
                if(result){
                    try {
                        let token = jwt.sign({userId: user._id}, 'secretkey');
                        return res.status(200).json({token: token})
                    } 
                    catch (err) {
                        return res.status(400).json({'message': 'Unable to log in'})
                    }
                }
                return res.status(401).json({
                    message: 'Please provide valid email and/or password'
                });
            });
        });} else{
        return res.status(401).json({
            message: 'Please provide valid email and/or password'
        });
    }
});

// Create a user
router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    // encrypt the password
    user.Password = bcrypt.hashSync(req.body.Password, 10)
    console.log(req.body)
    user.save(function(err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
});

//GET all users
router.get('/api/users', function(req, res, next) {

    User.find(function(err, users) {
        if (err) { 
            return next(err); 
        }
        res.json({'users': users });
    });

});


// Retrieve information from a user with token
router.get('/api/user', function(req, res, next) {
    let token = req.headers.token;
    console.log(token);
    jwt.verify(token, 'secretkey', function(err, decoded) {
        if (err) return res.status(401).json({
            //returns this
            title: 'unauthorized'
        })
        //token is valid
        User.findOne({ _id: decoded.userId }, (err, user) => {
          if (err) return console.log(err)
          return res.status(200).json({
            title: 'user grabbed',
            user: user})
        })
    })
    
});

//Deletes all users
router.delete('/api/users', function(req, res) {
    User.deleteMany({}, function(err, users) {
        if (err) {
            return res.status(409).json({ message: 'Users not deleted, because of:', 'error': err}); 
        }
        if (users === null) {
            return res.status(404).json({'message': 'Users not deleted'});
        }
        res.status(200).json(users);
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

// Partially update one user
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

// Completely update one user
router.put('/api/users/:id', function(req, res) {
    const user = User.findById(req.params.id);
    if (user.id === req.body.id)
        updateUser = User.findByIdAndUpdate(req.params.id, {$set: req.body,},{ new: true })
        .then(() => {
            res.status(200).json({
                message: "User updated successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "An error occured",
            });
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
            res.json(`User ID ${id} is now deleted.`);
        }
    );
});

// In Relationship to EXERCISES

// Add an exercise to the saved exercise list
router.post('/api/users/:user_id/exercises/:exercise_id', function(req, res){
    var user_id = req.params.user_id;
    var exercise_id = req.params.exercise_id;

    User.findById(user_id, function(err, user) {
        if (err) { 
            return res.status(404).json(
                {'message': 'User not found!', 'error': err}); 
        }
        if (user === null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        if (exercise_id ===  null) {
            return res.status(404).json(
                {"message": "Exercise not found"});
        }
        if(user.SavedExercises.includes(exercise_id)){
            return res.status(409).json({'message': 'Exercise already saved in the list'});
        } 
        user.SavedExercises.push(exercise_id);
        // Maybe we need to use 'populate' somewhere here?
        user.save();
        return res.status(201).json(user);
    });
});

// Retreive all exercises that a specific user saved.
router.get('/api/users/:user_id/exercises', function(req, res, next) {
    var id = req.params.user_id;
    User.findById(id, function(err) {
        if (err) { return next(err); }
    })
    .populate('SavedExercise')
    .then(user => {
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        if (user.SavedExercises === null) {
            return res.status(404).json({'message': 'No saved exercises from this user found!'});
        }
        // maybe we need to do .populate here
        res.json(user.SavedExercises);
    })
});

// maybe we need this as well? /Mijin
// Delete an exercise from a specific user's saved list
router.delete('/api/users/:user_id/saved_exercises/:exercise_id', function(req, res){
    var user_id = req.params.user_id;
    var exercise_id = req.params.exercise_id;

    User.findById(user_id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json(
                {"message": "User not found"});
        } try {
            let index = user.SavedExercises.indexOf(exercise_id);
            user.SavedExercises.splice(index, 1); //remove (one) element in the index position
            user.save();
            res.json(user);
        }
        catch(error) {
            return res.status(404).json({'message': 'Not valid exercise ID', 'error': error});
        }
    });
});

//Get reviews from a user
router.get('/api/users/:id/reviews', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        if (user.AuthoredReviews === null) {
            return res.status(404).json({'message': 'No authored reviews from this user found!'});
        }
        res.json(`List of authored reviews: ${user.AuthoredReviews}`);
    });
});

module.exports = router;