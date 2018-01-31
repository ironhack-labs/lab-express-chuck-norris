const express = require('express');
const Chuck  = require('chucknorris-io');

const app = express();
const client = new Chuck();

//configure app
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Retrieve random Joke
app.get('/random', (req, res, next) => {
    console.log('method: ' , req.method, ' path: ' ,  req.path, ' query: ' ,  req.query);

    // Retrieve a random chuck joke
    client.getRandomJoke().then((response) => {
        // use the response here
        console.log(response);

        var data = { 
            value: response.value,
            img: response.iconUrl
        }

        res.render('random', data);
    }).catch((err) => {
       // handle error
       res.render('error');
    });
});


// Retrieve by categories
app.get('/categories', (req, res, next) => {
    console.log('method: ' , req.method, ' path: ' ,  req.path, ' query: ' ,  req.query);

    // Retrieve a random chuck joke
    client.getJokeCategories().then((response) => {
        // use the response here
        console.log(response);

        var data = {
            array: response
        } 

        res.render('joke-by-category', data);
    }).catch((err) => {
        // handle error
        res.render('error');
    });
});



// Server Started
app.listen(3030, () => {
    console.log('My first app listening on port 3030!')
  });