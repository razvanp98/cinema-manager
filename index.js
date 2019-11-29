var Movie = require('./model/Movie');

// MODIFY MySQL CONFIGURATION CREDENTIALS

const MYSQL_CREDENTIALS_AUTH = {
    host: 'localhost',
    user: 'root',
    password: 'bucuresti98',
    database: 'theatre'
};

const path = require('path');
const express = require('express');
const sql = require('mysql');
const parser = require('body-parser');
const multer = require('multer');
const md5 = require('md5');

const app = express();

// Set storage for uploading covers

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '/public/img'));
    },
    filename: function(req, file, cb){
        // Generate filename stored in /public/img
        // Generated hash is stored in database
        let name = md5(Date.now() + file.originalname);
        cb(null, name + path.extname(file.originalname));
    }
});

var upload = multer({storage: storage});

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));

// ROUTING BELOW
// =====================================>

app.get('/', (req, res) => {
    res.redirect('/movies');
});

var data = [];
var genres = [];
var movie_genre = [];

app.get('/movies', (req, res) => {

    var conn = sql.createConnection(MYSQL_CREDENTIALS_AUTH);

    conn.connect((err) => {
        if(err) throw err;
    });

    // Get movies from database
    conn.query("SELECT *FROM theatre.movies;", (err, result) => {
        if(err) throw err;

        result.forEach((item) => {
            // For every movie get its genre_id from movie_genre table and look them up in genres for their names
            conn.query(`SELECT name FROM theatre.genres WHERE id_genre IN (SELECT id_genre FROM theatre.movie_genre WHERE id_movie = ${item.id_movie});`, (err, result) => {
                movie_genre = [];
                if(err) throw err;
                result.forEach((genre) => {
                    movie_genre.push(genre.name);
                });

                let movie = new Movie(item.id_movie, item.title, item.year, item.director, movie_genre, item.description, item.origin_country, item.img_hash);
                data.push(movie.toObject());  
            });
        });
    });

    conn.query("SELECT *FROM theatre.genres", (err, result) => {
        if(err) throw err;
        result.forEach((item) => {
            genre = {
                'id': item.id_genre,
                'genre_name': item.name
            }
            genres.push(genre);
        });
    });

    setTimeout ( () => {
        res.render("movies.ejs", {data: data, genres: genres});
        data = [];
        movie_genre = [];
        genres = [];
    }, 1500);
});

app.get('/categories', (req, res) => {
    res.render('categories');
});

// '/add' path

app.post('/add', upload.single('cover'), (req, res) => {

    let conn = sql.createConnection(MYSQL_CREDENTIALS_AUTH);

    conn.connect(function(err){
        if(err) throw err;
    });

    var title = req.body.title;
    let year = req.body.year;
    let director = req.body.director;
    let description = req.body.description;
    let country = req.body.country;
    let imgHash = req.file.filename;
    let genre = req.body.genres;

    conn.query(`INSERT INTO theatre.movies (title, year, director, description, origin_country, img_hash) VALUES ('${title}', ${year}, 
        '${director}', '${description}', '${country}', '${imgHash}');`, (err) => {
            if(err) throw err;
            console.log("Record added into database!");
    });

    // Get generated movie ID
    conn.query(`SELECT *FROM theatre.movies WHERE title = '${title}';`, (err, result) =>{
        if(err) throw err;
        var id = result[0].id_movie;

        // Insert in movie_genre table movie id for every genre selected in modal
        for(var i = 0; i < genre.length; i++){
            conn.query(`INSERT INTO theatre.movie_genre (id_movie, id_genre) VALUES (${id}, ${genre[i]});`, (err) => {
                if(err) throw err;
            });
        }
    });

    res.redirect('/');
});

app.post('/modify', (req, res) => {

});

// END ROUTING
// <===============================

// Virtual mounting point set to /static for images, CSS, JS scripts

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(80);