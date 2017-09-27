const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const app = express();
app.use(expressLayouts);

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
    console.log(joke);
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
    console.log(categories);
    res.render('categories', {
      categories: categories
    })
  })
  .catch((err)=> {
    // handle error
  });
})

app.listen(3000, () => {
  console.log('My first app listening on port 3000');
})
