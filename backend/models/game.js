var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({  
    game_id: Number,
    title: String,
    platform: String,
    status: String,
});

var Game = mongoose.model("Game", gameSchema);

module.exports = Game;
