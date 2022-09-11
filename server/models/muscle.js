var mongoose = Require('mongoose');
var Schema = mongoose.Schema;

var MuscleSchema = new Schema ({
    Name: {type: String},
    LatinName: {type: String},
    Description: {type: String},
    Exercises: [Number]
});

module.exports = mongoose.model('muscles', MuscleSchema);