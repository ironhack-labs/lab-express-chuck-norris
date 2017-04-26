const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('/', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req,res,next) => {
  client.getRandomJoke()
  .then((response) => {
    console.log(response);
    res.render('index', response);
  }).catch((err) => {
    // handle error
  });
});

app.get('/categories', (req,res,next) => {
  let category = req.query.cat || "categories";
  client.getJokeCategories()
  .then((response) => {
    var result = {
      current : category,
      array : response
    };
    console.log(response);
    res.render('categories', result);
  }).catch((err) => {
    // handle error
  });
});

app.listen(3000, () => {
});
