var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Email: { 
        type: String,
        required: true },
    Password: { 
        type: String,
        required: true },
    BodyInfo: { 
        Gender: { type: String },
        BodyWeight: { type: Number },
        BodyFat: { type: Number, min:3, max:40},
        Age: { type: Number, min:0, max: 140},
        Height: { type: Number, min: 30, max: 240},
        Goal: { type: String}
     },
    SavedExercises:[{
        type: Schema.Types.ObjectId, ref: "exercises"
    }],
    AuthoredReviews: [{
        type: Schema.Types.ObjectId, ref: "reviews"
    }]
});

module.exports = mongoose.model('users', UserSchema);