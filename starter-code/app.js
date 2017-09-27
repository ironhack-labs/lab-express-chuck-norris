const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const Chuck  = require('chucknorris-io');
const app = express();
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));


const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('layout', 'layout');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index', {
    pages: ['Home', 'random', 'categories', 'search']
  });

})

app.get('/random', (req, res, next) => {
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((joke) => {
    res.render('random',{
      joke: joke
    });

  }).catch((err) => {
    // handle error
  });

})

app.get('/categories', (req, res, next) => {

  client.getJokeCategories()
  .then((categories)=>  {
    res.render('categories', {
      categories: categories
    })
  })
  .catch((err)=> {
    // handle error
  });
})

app.get('/joke-by-category', (req, res, next) => {
  let cat = req.query.cat;
  client.getRandomJoke(cat)
  .then((joke) => {
    console.log(joke);
    res.render('joke-by-category', {
      joke, cat
    })
  })
  .catch((err) => {

  })
})

app.listen(3000, () => {
  console.log('My first app listening on port 3000');
})
