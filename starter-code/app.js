
const express        = require('express');
const app            = express();

//const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const path           = require('path');

// https://www.npmjs.com/package/chucknorris-io
const Chuck          = require('chucknorris-io');
const client         = new Chuck();

//app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
//app.set('layout', 'layouts/main-layout');


// First iteration
app.get("/", (req, res) => {
  res.render('home');
});

app.get('/random', (req, res) => {

  client.getRandomJoke()
  .then( (joke) => {
      res.render('index', joke);
  })
  .catch(function (err) {
    res.send('An error ocurred ${err}');
  });
});

app.get('/categories', (req, res) => {
  let catName      = req.query.cat;
  if (!catName) {
  client.getJokeCategories()
  .then((response)=>  {
      res.render('categories', {categories: response});
    })
    .catch((err)=> {
      res.send('An error ocurred ${err}');
    });
  } else {
    client.getRandomJoke(catName).then( (joke) => {
        res.render('joke-by-category', joke);
    });
  }
});

app.get('/search', (req, res) => {
  res.render('search-form', items = [])

});

app.post('/search', (req, res) => {
  let searchTerm = req.body.search;

  client.search(searchTerm)
  .then(function (items) {
    res.render('search-form', items)
  }).catch(function (err) {
    res.send('An error ocurred ${err}');
  });
});


// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
