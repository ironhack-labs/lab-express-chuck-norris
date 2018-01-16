// require modules

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();

const Chuck  = require('chucknorris-io');
const client = new Chuck();

// Middlewares config
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// App routes

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random', (req, res) => {
  client.getRandomJoke()
  .then((response) => {
    res.render('random', {
      randomJoke: response
    });
  }).catch((err) => {
    console.log("There is an error");
  });
});

app.get('/categories', (req, res) => {

  var category = req.query.cat;

  if (category) {
    client.getRandomJoke(category)
    .then((response) => {
      res.render('joke-by-category', {
        categoryJoke: response,
        selectedCategory: category
      });
    }).catch((err) => {
      console.log("There is an error");
    });
  } else {
    client.getJokeCategories()
    .then((response)=>  {
      let categories = response;
      let params = {
        getCategories: categories
      };
      res.render('categories', params);
    })
    .catch((err)=> {
      console.log("There is an error");
    });
  }
});

app.post('/search', (req, res) => {
  let keyword = req.body.keyword;

  client.search(keyword).then((jokes) => {
    let randomIndex = Math.floor(Math.random() * jokes.items.length - 1);

    let joke = jokes.items[randomIndex];

    res.render('joke-kw', {
      joke: joke.value,
      query: keyword
    });
  });
});

app.listen(3000, () => console.log("ready!"));
