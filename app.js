const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.get('/', (req, res, next) => {
  res.send("Homepage!");
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      const theJoke = response.value;
      res.render("random", {
        joke: theJoke
      });
    }).catch((err) => {
      res.send("Error!");
    });
});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
  .then((response)=>  {
    console.log(response);
    const theCategory = response.categories[1];
    res.render("categories", {
      category: theCategory,
    });
  }).catch((err)=> {
    res.send("Error!");
  });
});

app.get('/categories/dev', (req, res, next) => {
  res.send("Dev!");
});

app.get('/categories/sport', (req, res, next) => {
  res.send("Sport!");
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
