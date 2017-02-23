const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const app = express();
const client = new Chuck();

app.set('views', __dirname + '/views'); //where the html files are
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    console.log(response.value);

    res.render('random', {
      joke: response.value
    });

  }).catch((err) => {
    res.send(err);
  });
});

app.listen(3000, ()=>{
  console.log('ONLINE!');
});


app.get('/categories', (req, res, next) => {

  client.getJokeCategories()
  .then((response)=>  {
    console.log(response);

    res.render('joke-by-category', {
      categories: response
    });
  })
  .catch((err)=> {

  });

});

app.get('/:cat', (req, res, next) => {
  const category = req.params.cat;

  client.getRandomJoke(category)
  .then((response) => {
    res.render('random', {
      joke: response.value
    });

  }).catch((err) => {
    // handle error
    res.send(err);
  });

});

app.get('/search', (req, res, next) => {
  res.render('search-form', {

  });
});
