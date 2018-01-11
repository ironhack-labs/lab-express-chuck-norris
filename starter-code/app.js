const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// our first Route:
app.get('/random', (request, res, next) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      // use the response here
      res.send(`<p>${response.value}</p>`);
    }).catch((err) => {
      // handle error
    });
});

app.get('/categories', (request, res, next) => {
  if (request.query.cat === undefined) {
    client.getJokeCategories()
      .then((response) => {
        let data = [];
        for (let item of response) {
          let link = "http://localhost:3000/categories?cat=" + item;
          data.push(link);
        }
        let objData = {};
        objData.links = data;
        res.render('index', objData);
      })
      .catch((err) => {
        // handle error
      });
  } else {
    client.getRandomJoke(request.query.cat)
      .then((response) => {
        // use the response here
        let objData = {};
        objData.joke = response.value;
        res.render('joke-by-category', objData);
      }).catch((err) => {
        // handle error
      });
  }
});

app.get('/search', (request, res, next) => {
  res.render('search-form');
});

app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/search', function(req, res) {
  console.log('You sent the category = "' + req.body.categ + '".');
  
  // res.send('You sent the name "' + req.body.name + '".');
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});