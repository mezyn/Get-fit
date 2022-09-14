var mongoose = Require('mongoose');
var Schema = mongoose.Schema;

var MuscleSchema = new Schema ({
    Name: {type: String},
    LatinName: {type: String},
    Description: {type: String},
    Exercises: [{
        type: Schema.Types.ObjectId, ref: "exercises"
    }],
});

module.exports = mongoose.model('muscles', MuscleSchema);