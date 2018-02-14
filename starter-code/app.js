const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
    client
        .getRandomJoke()
        .then((response) => {
            res.render('index', { joke: response.value });
        // use the response here
        })
        .catch((err) => {
            throw err;
        });
        // handle error
    })


//category route
app.get('/categories', (req, res, next) => {
    client
        .getJokeCategories()
        .then((response)=>  {
            res.render('categories', { categories: response }); // use the response here
        })
        .catch((err)=> {
            // handle error
        });
    
})


app.get('/categories/:category', (req, res) => {
    const category = req.params.category;
    client
        .getRandomJoke(category)
        .then((response) => {
        res.render('joke-by-category', { categoryJoke: response.value });
        
        })
        .catch(err => {
            throw err;
        //handle error
    });
  });


app.listen(3000, () => {
    console.log('My first app listening on port 3000!');
  });