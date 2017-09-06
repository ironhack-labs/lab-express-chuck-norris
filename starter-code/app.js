/*jshint esversion: 6 */

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');

app.use(expressLayouts);
app.use(express.static('./public'));

app.get('/', (req, res, next) => {
  const data = {
    foo: 'bar'
  };
  // send views/index.ejs for displaying in the browser
  res.render('index', data);
});

app.get('/random', (request, response, next) => {
    client.getRandomJoke()
      .then((res) => {
        response.send('<p>' + res.value + '</p>');
      }).catch((err) => {
        throw err;
      });
});

app.get('/categories/:catid', (request, response, next) => {
    client.getRandomJoke(request.params.catid)
      .then((res) => {
        response.send('<p>' + res.value + '</p>');
      }).catch((err) => {
        throw err;
      });
});

app.get('/categories', (request, response, next) => {
    client.getJokeCategories()
      .then((cats) => {
        let data = {
          cats: cats
        };
        response.render('categories', data);
      }).catch((err) => {
        throw err;
      });
});

console.log('Tis working');

app.listen(4000, () => console.log('running'));
