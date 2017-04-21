/* jshint esversion:6 */
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');


app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});

app.use(bodyParser.urlencoded({extended : true}));

app.get('/random', function(request, response){
  client.getRandomJoke().then(function (res) {
        response.render('index.ejs', {res : res.value});
  }).catch(function (err) {
      // handle error
  });
});

app.get('/categories', function(request, response){
  client.getJokeCategories()
  .then((res)=>  {
     response.render('categories.ejs', {categories : res});
  })
  .catch((err)=> {
    console.error(err);
  });
});

app.get('/search', function(request, response) {
  response.render('search-forms.ejs');
});

app.post('/search', function(request, response, next){
  const keyboard = request.body.keyboard;
  client.search(keyboard).then(function (res) {
    response.send(res.items[0].value);
    // console.log(res.items[0]);
  }).catch(function (err) {
    next(err);
  });
});

app.get('/:category', function(request, response) {
  const category = request.params.category;
  client.getRandomJoke(category).then(function (res) {
    response.render('joke-by-category.ejs', {res : res.value, category});
}).catch(function (err) {

  });
});
