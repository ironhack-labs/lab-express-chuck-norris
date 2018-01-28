const express = require('express');

const Chuck  = require('chucknorris-io');
const bodyParser = require('body-parser');

const app = express();
const client = new Chuck();


app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
   client.getRandomJoke()
  .then((response) => {
    res.render('random', {response})
  })
  .catch((err) => {
    next(err);
  });
})

app.get('/categories', (req, res, next) => {
  const categories = []
  client.getJokeCategories()
  .then((response)=>  {
   res.render('categories', {response})
  })
  .catch((err)=> {
    next(err)
    });
})

app.get('/joke-by-category', (req, res, next) => {
  const category = req.param.cat;
  client.getRandomJoke(category)
  .then((response) => {
    res.render('joke-by-category', {response})
  })
  .catch((err) => {
    next(err);
  });
})

app.get('/search', (req, res, next) => {
  res.render('search-form')
})

app.post('/search', (req, res, next) => {
  const searchJoke = req.body.searchTerm;
  client.search(searchJoke)
  .then((response) => {
    res.render('search-result', {response})
  })
  .catch((err) => {
    next(err);
  });
})


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000);