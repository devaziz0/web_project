var express = require("express");
var app = express();
var User = require('./models/user');
var Game = require('./models/game')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/user', (req, res) => {
    User.find()
    .then ((personnes) => res.json(personnes))

})

app.get('/user/count', (req, res) => {
    User.find()
    .then ((personnes) => res.json({"count" : personnes.length}))
})

app.post('/user', (req, res) => {
    var user = req.body;

    User.create(user)
        .then((user) => 
            res.send(user)
        );
    
})

app.get('/user/:login', (req, res) => {

    User.findOne({'login' : req.params.login})
        .then((user, err) => 
            err != null ? {} : 
            res.json(user)
        )
        .catch((err) =>
         err != null ? res.sendStatus(404) : 
        {}
        );
    
})

app.put('/user/:login', (req, res) => {
    User.findOne({'login' : req.params.login})
        .then((user,err) => 
            User.updateOne(
                {'login' : user.login},
                {'login' : (req.body.login == undefined || null || '') ? user.login : req.body.login,
                 'password' : (req.body.password == undefined || null || '') ? user.password : req.body.password}
                ).then((user) => res.json(user)))
            .catch((err) => 
                    err != null ? res.sendStatus(500) : {}
            )
})

app.delete('/user/:login', (req, res) => {

    User.deleteOne({'login' : req.params.login})
        .then((user,err) => err == null ? res.sendStatus(200):
        res.sendStatus(500)

        );
    
})

app.get('/game', (req, res) => {
    
    Game.find()
    .then ((games) =>
        res.json(games))
    

})

app.get('/game/count', (req, res) => {

    Game.find()
    .then ((games) => res.json({"count" : games.length}))

})

app.get('/game/:id', (req, res) => {

    Game.find({'game_id': req.params.id })
        .then((game, err) => {
            err != null ? {} : 
            res.json(game)
        }
        
    )
    .catch((err) =>
     err != null ? res.sendStatus(404) : 
     {}
    );

})

app.put('/game/:id', (req, res) => {
    Game.findOne({'game_id' : req.params.id})
        .then((game,err) => 
            Game.updateOne(
                {'game_id' : game.game_id},
                {'game_id' : (req.body.game_id == undefined || null || '') ? game.game_id : req.body.game_id,
                 'title' : (req.body.title == undefined || null || '') ? game.title : req.body.title,
                 'platform' : (req.body.platform == undefined || null || '') ? game.platform : req.body.platform,
                 'status' : (req.body.status == undefined || null || '') ? game.status : req.body.status}
                ).then((game) => res.json(game)))
            .catch((err) => 
                    err != null ? res.sendStatus(500) : {}
            )
})

app.delete('/game/:id', (req, res) => {

    Game.deleteOne({'game_id' : req.params.id})
        .then((game,err) => err == null ? res.sendStatus(200):
        res.sendStatus(500)

        );
    
})

app.post('/game', (req, res) => {
    var game = req.body;

    Game.create(game)
        .then((game) => 
            res.send(game)
        );
    
})

app.listen(4000, () => {
    console.log('Server started');
})