const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// our first Route:
app.get('/random', (request, response) => {
  let cat = request.query.cat;
  if (cat) {
    client.getRandomJoke(cat)
      .then((res) => {
        // use the response here
        let joke = res;
        console.log(joke);
        response.render('joke-by-category', joke);
      })
      .catch((err) => {
        // handle error
      });
  } else {
    client.getRandomJoke()
      .then((res) => {
        // use the response here
        let joke = res;
        console.log(joke);
        response.render('index', joke);
      })
      .catch((err) => {
        // handle error
      });
  }
  // Retrieve a random chuck joke

});

app.get('/categories', (request, response) => {
  client.getJokeCategories()
    .then((res) => {
      // use the response here
      let categories = res;
      console.log(categories);
      response.render('categories', {
        categories
      });
    })
    .catch((err) => {
      // handle error
    });
});
app.get('/search', (request, response) => {
  response.render('search-form');
});

app.post('/search', (request, response) => {
  let searchTerm = request.body.searchTerm;
  client.search(searchTerm)
    .then((res) => {
      // to stuff here
      console.log(res);
      let searchResults = res;
      response.render('search-form', {
        searchResults:res
      });
    })
    .catch((err) => {
      // handle error
      response.render('search-form', err);
    });
});

// Server Started
app.listen(3000, () => {
  console.log('Server started');
});
