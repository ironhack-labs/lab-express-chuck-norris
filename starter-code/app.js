const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/random', (req, res, next) => {

  client.getRandomJoke()
    .then((response) => {
      console.log(response);
      res.render('joke-by-category', {joke: response});
    }).catch((err) => {
      // handle error
    });
});

app.get('/categories', (req, res, next) => {
  if (req.query.cat === undefined){
    client.getJokeCategories()
    .then((response)=>  {
      res.render('categories', {categories: response})
    })
    .catch((err)=> {
      // handle error
    });

  } else {
    client.getRandomJoke(req.query.cat)
    .then((response) => {
      console.log(response);
      res.render('joke-by-category', {joke: response})
    }).catch((err) => {
      // handle error
    });
  }
});


app.get('/search', (req, res, next) => {
  res.render('search');
});


app.post('/search', (req, res, next)=> {

  client.search(req.body.name)

  .then(function (response) {
      console.log(response);
    res.render('foundjokes', {jokes: response.items});
  }).catch(function (err) {
    // handle error
  });
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
