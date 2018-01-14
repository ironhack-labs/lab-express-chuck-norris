const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');
const ejsLint = require('ejs-lint');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (request, response, next) => {
  response.render('index');
});

app.get('/random', (request, response, next) => {
  client.getRandomJoke()
    .then((res) => {
      response.render('random', {
        joke: res
      });
    }).catch((err) => {
      console.log(err);
    });
});

app.get('/categories', (request, response, next) => {
  let cat = request.query.cat;
  if (cat) {
    client.getRandomJoke(cat)
      .then((res) => {
        response.render('joke-by-category', {
          joke: res,
          cat: cat
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    client.getJokeCategories()
      .then((res) => {
        response.render('categories', {
          categories: res
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }
});


app.get('/search', (request, response, next) => {
  let emptyJoke = {
    items: []
  }
  response.render('search', {
    jokes: emptyJoke
  });
});

app.post('/search', (request, response, next) => {
  let search = request.body.kw;

  client.search(search)
    .then(function(res) {
      console.log(res)
      response.render('search', {
        jokes: res
      });
    }).catch(function(err) {
      // handle error
    });
});

app.listen(3000, () => {
  console.log('Server ready')
});
