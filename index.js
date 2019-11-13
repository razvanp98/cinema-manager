//Import Classes under ./models

const Movie = require('./model/Movie');

// MODIFY MySQL CONFIGURATION KEY

const MYSQL_CREDENTIALS_AUTH = {
    host: 'localhost',
    user: 'root',
    password: 'bucuresti98',
    database: 'test'
};

const path = require('path');
const express = require('express');
const sql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/movies');
});

app.get('/movies', (req, res) => {
    let conn = sql.createConnection(MYSQL_CREDENTIALS_AUTH);

    var data = {};

    conn.connect(function(error){
        if(error) throw error;
        console.log("MySQL server connected!");
        conn.query("SELECT *FROM test.test_table;", function(err, result){
            if(err) throw err;
            data = {
                id: result[0].id,
                nume: result[0].nume,
                prenume: result[0].prenume,
                varsta: result[0].varsta
            };
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