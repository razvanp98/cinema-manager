const path = require('path');
const express = require('express');
const sql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

<<<<<<< HEAD
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('index');
});

app.get('/movies', (req, res) => {
=======
app.get('/home', (req, res) => {
    let questions = {
        _question: [
            {id: 1, _body: "Unde pula meeeaaa esti?"},
            {id: 2, _body: "Unde mortii ma-tii ai pus cana aia?"},
            {id: 3, _body: "Unde sloboz parchezi?"}
        ]
    }
    res.render('index', {data: questions});
});

app.get('/', (req, res) => {
>>>>>>> 5e947a6cffd3e6c96e293746ec3c387f2aa2492d
    res.redirect('/home');
});

// Static files setter

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(80);