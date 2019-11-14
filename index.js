//Import Classes under ./models

const Movie = require('./model/Movie');

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
const size = require('image-size');

const app = express();

size('./public/img/18dd27275fe556e1079f47431f462d86.jpg', (err, dimension) => {
    if(err) throw err;
    console.log(dimension.width, dimension.height);
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/movies');
});

app.get('/movies', (req, res) => {
    let conn = sql.createConnection(MYSQL_CREDENTIALS_AUTH);

    var data = [];
    var obj = {};

    conn.connect(function(error){
        if(error) throw error;
        console.log("MySQL server connected!");
        conn.query("SELECT *FROM theatre.movies;", function(err, result){
            if(err) throw err;
            result.forEach((item) => {
                obj = {
                    id: item.id_movie,
                    title: item.title,
                    director: item.director,
                    year: item.year,
                    description: item.description, 
                    country: item.origin_country,
                    imgHash: item.img_hash
                };
                data.push(obj);
            });
            console.log(data);
            res.render('movies', {data: data});
        });
    });
});

app.get('/categories', (req, res) => {
    res.render('categories');
});

// Virtual mounting point set to /static for images, CSS, JS scripts

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(80);