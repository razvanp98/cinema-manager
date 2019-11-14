//Import Classes under ./models

var Movie = require('./model/Movie');

// MODIFY MySQL CONFIGURATION KEY

const MYSQL_CREDENTIALS_AUTH = {
    host: 'localhost',
    user: 'root',
    password: 'bucuresti98',
    database: 'theatre'
};

const path = require('path');
const express = require('express');
const sql = require('mysql');
const jimp = require('jimp');
const parser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.redirect('/movies');
});

app.get('/movies', (req, res) => {
    let conn = sql.createConnection(MYSQL_CREDENTIALS_AUTH);

    var data = [];

    conn.connect(function(error){
        if(error) throw error;
        conn.query("SELECT *FROM theatre.movies;", function(err, result){
            if(err) throw err;
            result.forEach((item) => {
                var movie = new Movie(item.id_movie, item.title, item.year, item.director, null, item.description, item.origin_country, item.img_hash);
                console.log(movie.toObject());
                data.push(movie.toObject());
            });
            res.render('movies', {data: data});
        });
    });
});

app.get('/categories', (req, res) => {
    res.render('categories');
});

// Add movie path

app.post('/add', (req, res) => {
    let post_obj = {
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        description: req.body.description,
    };
    console.log(post_obj);
    res.redirect('/');
}); 

// Virtual mounting point set to /static for images, CSS, JS scripts

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(80);