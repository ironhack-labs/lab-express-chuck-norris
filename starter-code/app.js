const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');

const expressLayouts = require('express-ejs-layouts');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', 'layouts/main');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// our first Route
app.get('/', (req, res, next) => {
  console.log(req);

  res.render('index');
});
app.get('/random', (req, res, next) => {

  client.getRandomJoke().then(function (response) {
    res.render('random',{response});
}).catch(function (err) {
    // handle error
});







});
app.get('/categories', (req, res, next) => {
  console.log(req);
  client.getJokeCategories()
  .then((response)=>  {
    console.log("lista", response);

    res.render('categories', {response});
  })
  .catch((err)=> {

  });

});
app.get('/search', (req, res, next) => {
  console.log(req);

      res.render('search-form');

  //let searchTerm = req.query.searchTerm;


});
app.post('/search', (req, res, next) => {
  console.log(req);
    let searchTerm = req.body.searchTerm;


      client.search(searchTerm)
        .then(function (response) {
          console.log("rrresponse", response);
          res.render('search', {response, searchTerm});
        }).catch(function (err) {
          // handle error
        });

  //let searchTerm = req.query.searchTerm;


});

app.get('/joke-by-category', (req, res, next) => {
  let cat = req.query.cat;
  client.getRandomJoke(cat)
  .then(function (response) {
    res.render('joke-by-category',{response, cat});
}).catch(function (err) {
    // handle error
});


});


// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
