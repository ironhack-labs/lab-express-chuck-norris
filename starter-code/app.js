const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/random', (request, res, next) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      res.render('random', response);
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

app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/search', function (req, res) {
  client.search(req.body.categ)
    .then(function (response) {
      let arraData=[];
      response.items.forEach(element => {
        arraData.push(element.value)
      });
      let arraObj={jokes:arraData};
      res.render('search-result',arraObj);
    }).catch(function (err) {
      // handle error
    });
});

app.get('/home', (request, res, next) => {
  res.render('home');
});
app.get('/', (request, res, next) => {
  res.render('home');
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});