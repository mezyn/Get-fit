var mongoose = Require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Email: { type: String },
    Password: { type: Number },
    BodyInfo: { 
        Gender: { type: String },
        BodyWeight: { type: Number },
        BodyFat: { type: Number, min:3, max:40},
        Age: { type: Number, min:0, max: 140},
        Height: { type: Number, min: 30, max: 240},
        Goal: { type: String}
     },
    SavedExercises:[Number],
    AuthoredReviews: [Number]
});

module.exports = mongoose.model('users', UserSchema);