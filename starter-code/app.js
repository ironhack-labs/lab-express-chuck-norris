const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

// -- setup

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// -- routes

app.get('/random', (req, res, next) => {
        // Retrieve a random chuck joke
        next("SDFAFSDFSDFSDF");
    client.getRandomJoke()
    .then((response) => {
        res.render('index',response);
    }).catch((err) => {
        next(err);
    });
});
  
app.get('/categories', (req, res, next) => {
//    console.log(req.query);
    client.getJokeCategories()
    .then((response)=>  {
        const data = {
            categories: response
        };
        res.render('categories', data);
    })
    .catch((err)=> {
        next(err);
    });
});

app.get('/categories/:cat', (req, res) => {
    console.log(req.params.cat);
    res.send('GET');
});

// -- 404 and error handlers


app.use((req, res) => {
    res.status(404).send('404!!!!');
});


app.use((err, req, res, next) => {
    console.log(req.method, req.path, err);
    res.status(500).send('UPS!!!!');
});

// -- start the server

app.listen(3000, () => {
    console.log("listening");
});