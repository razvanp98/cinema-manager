const path = require('path');
const express = require('express');
const sql = require('mysql');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('index');
});

app.get('/movies', (req, res) => {
    res.redirect('/home');
});

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(80);