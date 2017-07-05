const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', 'layouts/_main');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then((response) => {
      res.render('random', {response});
    }).catch((err) => {
      throw err;
    });
});

app.get('/categories', (req, res) => {
  if(req.query.cat === undefined) {
    client.getJokeCategories()
    .then((response)=>  {
      res.render('categories', {response})
    })
    .catch((err)=> {
      throw err;
    });
  } else {
    client.getRandomJoke(req.query.cat)
      .then((response) => {
        res.render('joke-by-category', {response});
      }).catch((err) => {
        throw err;
      });
  }
});

app.get('/search', (req, res) => {
  let response = [];
  res.render('search', {response});
});

app.post('/search', (req, res) => {
  client.search(req.body.category)
  .then(function (response) {
    res.render('search', {'response': response.items});
  }).catch(function (err) {
    res.send('<p>Error!</p>');
  });
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
