const path = require('path');
const express = require('express');
const sql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/movies');
});

app.get('/movies', (req, res) => {
    res.render('index');
});

app.get('/categories', (req, res) => {
    res.render('categories');
});

// Virtual mounting point set to /static for images, CSS, JS scripts

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(80);