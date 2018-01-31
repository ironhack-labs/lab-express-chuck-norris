const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(morgan(`Request Method: :method, Request URL: :url, Response Time: :response-time(ms)`));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//routes
app.get('/random', (req, res, next) => {
    client.getRandomJoke()
        .then((response) => {
            res.render('index', {
                random: response.value
            });
        }).catch((err) => {});
    //OJO QUE HAY QUEPASAR UN OBJ!!!
    // res.render('index',{ random: random });
});


app.get('/categories', (req, res, next) => {
    let jokeCat = req.query.cat;
    client.getJokeCategories()
        .then((response) => {
            res.render('categories', {
                response: response
            });
        }).catch((err) => {});
});

app.get('/joke-by-category', (req, res, next) => {
    let jokeCat = req.query.cat;
    client.getRandomJoke(jokeCat)
        .then((response) => {
            res.render('joke-by-category', {
                random_cat: response.value
            });
        }).catch((err) => {});
});

app.get('/search', (req, res, next) => {
    res.render('search-form');
});

app.post('/search', (req, res, next) => {
    let searchTerm = req.body.type;
    res.redirect(`/joke-by-category?cat=${searchTerm}`);
});

app.get('/', (req, res, next) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('My first app listening on port 3000!');
});