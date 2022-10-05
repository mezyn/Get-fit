var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema ({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    DifficultyScore:{
        type: Number, 
        min: 0, 
        max: 5
    },
    Reviews:[{
        type: Schema.Types.ObjectId, ref: "reviews"
    }],
    Muscles: [{
        type: Schema.Types.ObjectId, ref: "muscles"
    }
    ],
    TipsAndTricks: {
        type: String
    }
});

module.exports = mongoose.model('exercises', ExerciseSchema);