var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({  
    movie_id: Number,
    title: String,
    category: String,
    tag: String,
});

var Movie = mongoose.model("Movie", gameSchema);

module.exports = Movie;
