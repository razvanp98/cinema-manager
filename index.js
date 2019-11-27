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
const parser = require('body-parser');
const multer = require('multer');
const md5 = require('md5');
const jimp = require('jimp');

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

app.get('/', (req, res) => {
    res.redirect('/movies');
});

app.get('/movies', (req, res) => {

    var data = [];
    let conn = sql.createConnection(MYSQL_CREDENTIALS_AUTH);

    conn.connect(function(error){
        if(error) throw error;
        conn.query("SELECT *FROM theatre.movies;", function(err, result){
            if(err) throw err;
            result.forEach((item) => {
                let movie = new Movie(item.id_movie, item.title, item.year, item.director, null, item.description, item.origin_country, item.img_hash);
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

app.post('/add', upload.single('cover'), (req, res) => {

    let conn = sql.createConnection(MYSQL_CREDENTIALS_AUTH);

    conn.connect(function(err){
        if(err) throw err;
        let title = req.body.title;
        let year = req.body.year;
        let director = req.body.director;
        let description = req.body.description;
        let country = req.body.country;
        let imgHash = req.file.filename;

        // Resize the image to fit the card and overwrite the image

        conn.query(`INSERT INTO theatre.movies (title, year, director, description, origin_country, img_hash) VALUES ('${title}', ${year}, 
        '${director}', '${description}', '${country}', '${imgHash}');`, (err) => {

            if(err) throw err;
            console.log("Record added into database!");
        });
    });
    res.redirect('/');
}); 

// Virtual mounting point set to /static for images, CSS, JS scripts

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(8080);