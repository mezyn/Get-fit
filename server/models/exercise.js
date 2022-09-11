var mongoose = Require('mongoose');
var Schema = mongoose.Schema;


var ExerciseSchema = new Schema ({
    Name: {type: String},
    AverageRating: {type: Number, min: 0, max: 5},
    DifficultyScore:{type: Number, min: 0, max: 5},
    Reviews:[Number],
    TipsAndTricks: {type: String }
});

module.exports = mongoose.model('exercises', ExerciseSchema);