const express = require('express');
const app = express();

const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index')
});
app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((response) => {
    res.render('index', response)
  }).catch((err) => {});

});
app.get('/categories', (req, res, next) => {
  client.getJokeCategories().then( response => {
    console.log(response)
    let array = {
      value: response
    }
    res.render('index', array)
  })
});
app.get('/search', (req, res, next) => {
  res.render('index')
});


app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
