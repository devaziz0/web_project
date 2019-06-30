var express = require("express");
var app = express();
var User = require('./models/user');
var Game = require('./models/movie')
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

app.get('/movie', (req, res) => {
    
    Game.find()
    .then ((movies) =>
        res.json(movies))
    

})

app.get('/movie/count', (req, res) => {

    Game.find()
    .then ((movies) => res.json({"count" : movies.length}))

})

app.get('/movie/:id', (req, res) => {

    Game.find({'movie_id': req.params.id })
        .then((movie, err) => {
            err != null ? {} : 
            res.json(movie)
        }
        
    )
    .catch((err) =>
     err != null ? res.sendStatus(404) : 
     {}
    );

})

app.put('/movie/:id', (req, res) => {
    Game.findOne({'movie_id' : req.params.id})
        .then((movie,err) => 
            Game.updateOne(
                {'movie_id' : movie.movie_id},
                {'movie_id' : (req.body.movie_id == undefined || null || '') ? movie.movie_id : req.body.movie_id,
                 'title' : (req.body.title == undefined || null || '') ? movie.title : req.body.title,
                 'category' : (req.body.category == undefined || null || '') ? movie.category : req.body.category,
                 'tag' : (req.body.tag == undefined || null || '') ? movie.tag : req.body.tag}
                ).then((movie) => res.json(movie)))
            .catch((err) => 
                    err != null ? res.sendStatus(500) : {}
            )
})

app.delete('/movie/:id', (req, res) => {

    Game.deleteOne({'movie_id' : req.params.id})
        .then((movie,err) => err == null ? res.json({"done":200}):
        res.sendStatus(500)

        );
    
})

app.post('/movie', (req, res) => {
    var movie = req.body;

    Game.create(movie)
        .then((movie) => 
            res.send(movie)
        );
    
})

app.listen(4000, () => {
    console.log('Server started');
})