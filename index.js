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
    let conn = sql.createConnection(MYSQL_CREDENTIALS_AUTH);

    conn.connect(function(error){
        if(error) throw error;
        console.log("MySQL server connected!");
    })
    res.redirect('/movies');
});

app.get('/movies', (req, res) => {
    res.render('movies');
});

app.get('/categories', (req, res) => {
    res.render('categories');
});

// Virtual mounting point set to /static for images, CSS, JS scripts

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(80);