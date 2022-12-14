var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema ({
    Title: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        min: 0,
        max: 5
    },
    MainText : {
        type: String,
        required: true
    },
    Author : {
        type: Schema.Types.ObjectId, ref: "users"
    },
    Exercise : {
        type: Schema.Types.ObjectId, ref: "exercises"
    }
});

module.exports = mongoose.model('reviews', ReviewSchema);
