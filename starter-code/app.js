'use strict';

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

//Configure app
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



//Routes
// retrieve a random chuck joke
app.get('/', (req, res, next) => {
    console.log('Get Working');
    res.render('index');
});

app.get('/random', (req, res, next) => {
    client.getRandomJoke()
    .then((chuckRes) => {
        // use the response here
        res.render('index', chuckRes);
    }).catch((err) => {
        // handle error
        res.send('<p>Error getting random joke</p>');
    });
});

//Start App    
app.listen(3000, () => {
    console.log('Server running');
});

