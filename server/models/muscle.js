var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MuscleSchema = new Schema ({
    Name: {
        type: String,
        required: true}
        ,
    LatinName: {type: String},
    Description: {type: String},
    Exercises: [{
        type: Schema.Types.ObjectId, ref: "exercises"
    }],
});

module.exports = mongoose.model('muscles', MuscleSchema);