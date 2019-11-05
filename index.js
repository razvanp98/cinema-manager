const path = require('path');
const express = require('express');
const sql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

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
    res.redirect('/home');
});

// Static files setter

app.use('/static', express.static(path.join(__dirname, '/public')));
app.listen(80);