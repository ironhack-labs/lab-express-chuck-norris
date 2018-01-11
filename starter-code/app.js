const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));

app.use(expressLayouts);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    console.log(response)
    res.render('random', {
      randomJoke: response
    });
  }).catch((err) => {
    console.log("There is an error");
  });
});

app.listen(3000);
