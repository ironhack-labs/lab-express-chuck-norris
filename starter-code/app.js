const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const port = 3000;

//layouts
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('layout', 'layouts/main'); // initial
app.set('views', __dirname + '/views'); //engine de js
app.set('view engine', 'ejs'); // compilar ejs's


app.get('/', (req, res, next) => {
  res.render('index');
  /*COMO PONGO UNA PAGINA PRINCIPAL DIRECTAMENTE SIN LLAMAR A INDEX*/
  console.log("GET /");
});

/**
 * Fetch a random Chuck Norris joke
 */
app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      let data = {
        randomJoke: response.value
      };
      // pass a local variable to the view
      res.render("random", {
        "joke": data.randomJoke //joke is the attribute to fill the view 'random'
      });
    }).catch((err) => {
      res.send(`ERROR GETTING RANDOM JOKE`);
    });
});

/**
 * Fetch a Chuck Norris categories list
 */
app.get("/categories", (req, res, next) => {
  client.getJokeCategories()
    .then((response) => {
      let data = {
        listCategories: response
      };
      res.render("categories", {
        "list": data.listCategories //list is the attribute to fill the view 'categories'
      });
    })
    .catch((err) => {
      res.send(`ERROR GETTING CATEGORIES`);
    });
});


/**
 * Route parameters:
 * Route path: /users/:userId/books/:bookId
 * Request URL: http://localhost:3000/users/34/books/8989
 * req.params: { "userId": "34", "bookId": "8989" }
 */
app.get("/categories/:category", (req, res, next) => {
  client.getRandomJoke(req.params.category)
    .then((response) => {
      let data = {
        category: req.params.category,
        joke: response.value
      };
      res.render("joke-by-category", {
        "category": data.category,
        "joke": data.joke
      });
    }).catch((err) => {
      res.send(`ERROR GETTING CATEGORY`);
    });
});

app.get('/search-form', (req, res, next) => {
  let data = {
    jokes: false
  };
  res.render('search-form', {
    "jokes": data.jokes
  });
});

/**
 * Send jokes to an array in search-form
 */
app.post("/search-form", (req, res, next) => {

  client.search(req.body.key)
    .then((response) => {
      console.log(response);
      let data = {
        category: req.body.keyword,
        count: response.count,
        jokes: response.items,
        //response.items[0].value --> one joke
      };
      res.render("search-form", {"category": data.category,"jokes":data.jokes,"count":data.count});
    }).catch(function(err) {
      res.send(`ERROR GETTING POST SEARCH FORM`);
    });
});

app.listen(port, () => {
  console.log('My first app listening on port 3000!');
});
