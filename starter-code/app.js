const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

//configure app
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// our first Route
app.get('/random', (request, res, next) => {
    console.log('method: ' , request.method, ' path: ' ,  request.path, ' query: ' ,  request.query);

    // Retrieve a random chuck joke
    client.getRandomJoke().then((response) => {
        // use the response here
        console.log(response);

        var data = { 
            value: response.value,
            img: response.iconUrl
        }

        res.render('index', data);
    }).catch((err) => {
        // handle error
    });
});


app.get('/categories', (request, res, next) => {
    console.log('method: ' , request.method, ' path: ' ,  request.path, ' query: ' ,  request.query);

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
    });
});



// Server Started
app.listen(3030, () => {
    console.log('My first app listening on port 3030!')
  });