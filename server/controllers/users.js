var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Exercise = require('../models/exercise');
var Review = require('../models/review');

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

// EXERCISES

// Add an exercise to the saved exercise list
router.post('/api/users/:user_id/saved_exercises', function(req, res){
    var id = req.params.user_id;
    var exercise_id = req.body.exercise;

    User.findById(id, function(err, user) {
        if (err) { return res.status(404).json({'message': 'User not found!', 'error': err}); }
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
        user.save();
        return res.status(201).json(user);
    });
});

router.get('/api/users/:user_id/exercises', function(req, res, next) {
    var id = req.params.user_id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        if (user.SavedExercises === null) {
            return res.status(404).json({'message': 'No saved exercises from this user found!'});
        }
        // maybe we need to do .populate here
        res.json(user.SavedExercises);
    });
});

// maybe we need this as well? /Mijin
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
            user.SavedExercises.splice(index, 1);
            user.save();
            res.json(user);
        }
        catch(error) {
            return res.status(404).json({'message': 'Not valid exercise ID', 'error': error});
        }
    });
});

// REVIEWS

// Add a review to the list of authored reviews and to the review collection
router.post('/api/users/:user_id/authored_reviews', function(req, res, next){
    var user_id = req.params.user_id;
    var review = new Review(req.body);
    User.findById(user_id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        } else if (exercise_id == null) {
            return res.status(404).json(
                {"message": "Exercise not found"});
        } else {
            review.save(function (err) {
                if (err) {
                  console.log(err);
                  return res.status(500);
                }
                res.status(201).json(review);
              });
            user.AuthoredReviews.push(review);
            user.save();
            return res.status(201).json(user);
        }
    })
});

router.get('/api/users/:user_id/exercises', function(req, res, next) {
    var id = req.params.user_id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        if (user.AuthoredReviews === null) {
            return res.status(404).json({'message': 'No authored reviews from this user found!'});
        }
        // maybe we need to do .populate here
        res.json(user.AuthoredReviews);
    });
});

// Delete review (both from users and from reviews)
router.delete('/api/users/:user_id/authored_reviews/:review_id', function(req, res){
    var user_id = req.params.user_id;
    var review_id = req.params.review_id;

    User.findById(user_id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json(
                {"message": "User not found"});
        } try {
            
            let index = user.AuthoredReviews.indexOf(review_id);
            user.AuthoredReviews.splice(index, 1);
            user.save();
            res.json(user);
        }
        catch(error) {
            return res.status(404).json({'message': 'Not valid review ID', 'error': error});
        }
    });
    // I am not sure whether we can split it up like that, but I needed to delete it from both right?
    Review.findOneAndDelete(review_id, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
            res.json(review);
        }
    );
});

module.exports = router;