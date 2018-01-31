const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
    // Retrieve a random chuck joke
    client.getRandomJoke()

        .then((joke) => {
            console.log(joke);

            let giJoke = joke.value;

            res.render('index', { giJoke });

        }).catch((err) => {
            // handle error
            throw err;
        });
});

app.get('/categories', (req, res) => {
    client.getJokeCategories()
        .then((cat) => {
            let categoriesJoke = cat;
            res.render('categories', { categoriesJoke });
        })
        .catch((err) => {
            // handle error
            throw err;
        });
});

app.get('/categories/:category', (req, res) => {
    clickedCategory = req.params;
    console.log(clickedCategory);
    client.getRandomJoke(clickedCategory)
    .then((joke) => {
            console.log(joke);
            let giiJoke = joke.value;
            // console.log(giiJoke)
            res.render('joke-by-category', {giiJoke});
        })
        .catch((err) => {
            // handle error
            throw err;
        });
})


app.listen(3000, () => {
    console.log('My first app listening on port 3000!')
});

