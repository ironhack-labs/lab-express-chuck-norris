const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.set('layout', 'layouts/index');
app.use(expressLayouts);



// home page

app.get('/home', (request, response, next) => {
    // console.log("Home page");
    response.render("home");
})


// get a random joke


app.get('/random', (request, response, next) => {
    client.getRandomJoke()
        .then((joke) => {
            let jokeValue = joke.value;
            response.render("random", { jokeValue });
        }).catch((err) => {
            console.log("error");
        });
});

// categories 

app.get('/categories', (request, response) => {
    client.getJokeCategories()
        .then((response) => {
            let categories = response;

            response.render('categories', { categories });
        })
        .catch((err) => {
            console.log("error from the categories department");
        });
})

// search for a jokey

app.get('/search', (request, response) => {
    let jokes = [];
    response.render('search-form', { jokes });
})

// secure search form

app.post('/search', (request, response) => {
    client.search(request.body.keyword)
        .then(function (answer) {
            let jokes = answer.items;
            response.render('search-form', { jokes });
        }).catch(function (err) {
            console.log("error");

        })
})

// set the listen port and say hello

app.listen(3000, () => {
    console.log("i'm listening from 3000");


})

