'use strict';

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

//configure app
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use(expressLayouts);
app.use(express.static('static'));

//routes
app.get('/random', (req, res, next) => {
    client.getRandomJoke()
        .then((response) => {
            let data = {
                joke: response.value
            };
            res.render('random', data);
        }) .catch((err) => {
            console.log(error);
        })

});

app.get('/categories', (req, res, next) => {
    client.getJokeCategories()
        .then((response) => {
            let data = {
                categoriesArray: response
            };
            res.render('categories', data);
        }) .catch((err) => {
            console.log(error);
        })

});

//start the app
app.listen(3000, () => {
    console.log('Chuck Norris jokes')
  });