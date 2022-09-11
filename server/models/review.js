var mongoose = Require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema ({
    Title: {type: String},
    Rating: {type: Number, min: 0, max: 5},
    MainText : {type: String},
});

module.exports = mongoose.model('reviews', ReviewSchema);
