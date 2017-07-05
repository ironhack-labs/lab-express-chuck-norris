const express = require('express');
const Chuck = require('chucknorris-io');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();
const client = new Chuck();

// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);

// sets
app.set('layout', 'layouts/main');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    console.log('io');
    res.render('index');
});

app.get('/random', (req, res) => {

    // console.log('req query', req.query);

    // Retrieve a random chuck joke
    client.getRandomJoke()
        .then((response) => {
            // use the response here
            console.log('response', response);
            res.render('random', { joke: response.value });
        }).catch((err) => {
            // handle error
        });

});

app.get('/categories', (req, res) => {

    client.getJokeCategories()
        .then((response) => {
            // use the response here
            // console.log(response);
            const categoriesList = response;
            res.render('categories', { categoriesList });
        })
        .catch((err) => {
            // handle error
        });

});

// /cat-ran?cat=sports
app.get('/joke', (req, res) => {

    // Retrieve a random chuck joke
    client.getRandomJoke(req.query.cat)
        .then((response) => {
            // use the response here

            res.render('joke-by-category', { joke: response.value, category: req.query.cat });

        }).catch((err) => {
            // handle error
        });
});

app.get('/search', (req, res) => {
    // bool = false;
    res.render('search-form', {access:false});
});

app.post('/search', (req, res) => {

    let searchTerm = req.body.search;
    
    client.search(searchTerm)
        .then(function (response) {
            // to stuff here
            // bool = true;
            // console.log("resp" + response.value);
            let rand = Math.floor(Math.random() * response.items.length )

            res.render('search-form', {access: true, joke: response.items[rand].value});
            
        }).catch(function (err) {
            // handle error
        });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

