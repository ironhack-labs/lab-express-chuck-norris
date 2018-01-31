const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan(`Request Method: :method, Request URL: :url, Response Time: :response-time(ms)`));

//routes
app.get('/random', (req, res, next) => {
    client.getRandomJoke()
        .then((response) => {
            res.render('index', {
                random: response.value
            });
        }).catch((err) => {
            // throw err;
        });
    //OJO QUE HAY QUEPASAR UN OBJ!!!
    // res.render('index',{ random: random });
});

let jokeCat;
app.get('/categories', (req, res, next) => {
    jokeCat = req.query.cat;
    client.getJokeCategories()
        .then((response) => {
            console.log(jokeCat);
            res.render('categories', {
                response: response
            });
        }).catch((err) => {
            // throw err;
        });
});


app.get('/joke-by-category', (req, res, next) => {
    jokeCat = req.query.cat;
    client.getRandomJoke(jokeCat)
        .then((response) => {
            console.log(response);
            res.render('joke-by-category', {
                random_cat: response.value
            });
        }).catch((err) => {
            // throw err;
        });
});


app.listen(3000, () => {
    console.log('My first app listening on port 3000!');
});