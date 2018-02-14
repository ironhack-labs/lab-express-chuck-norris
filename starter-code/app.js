const express    = require('express');
const Chuck      = require('chucknorris-io');
const bodyParser = require('body-parser');

const app = express();
const client = new Chuck();

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, (req, res, next) => {
  res.render('home');
})

app.get(`/random`, (req, res, next) => {
  client.getRandomJoke('dev')
    .then((response) => {
      res.render('index', {response});
    }).catch((err) => {
      console.log(err);
    });
})

app.get(`/categories`, (req, res, next) => {
  client.getJokeCategories()
    .then((response)=>  {
      res.render('categories', {response});
    })
    .catch((err)=> {
      console.log(err);
    });
})

app.get(`/categoryjoke`, (req, res, next) => {
  client.getRandomJoke(req.query.cat)
    .then((response) => {
      res.render('index', {response});
    }).catch((err) => {
      console.log(err);
    });
})

app.get(`/search`, (req, res, next) => {
  res.render('search-form')
})

app.post(`/search`, (req, res, next) => {
  client.search(req.body.joke)
  .then(function (response) {
    console.log(response.items[0]);
    res.render('searchresult', {response})
  }).catch(function (err) {
    console.log(err)
  });
})

app.listen(3000, () => {
  console.log(`Chuck Norris app listening on port 3000!`);
})