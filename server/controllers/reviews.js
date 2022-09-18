var express = require('express');
var router = express.Router();
var Review = require('../models/review');

// create review
router.post('/api/reviews', function(req, res, next){
    var review = new Review(req.body);
    review.save(function(err, review) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
});

router.get('/api/reviews', function(req, res, next) {
    Review.find(function(err, review) {
        if (err) { return next(err); }
        res.json({'reviews': review });
    });
});

router.get('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findById(id, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found!'});
        }
        res.json(review);
    });
});

module.exports = router;