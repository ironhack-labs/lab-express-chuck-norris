const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', function(req, res){
  client.getRandomJoke()
    .then((response) => {
      console.log(response);
      var i = response.value;
      res.send(i);
    }).catch((err) => {
      console.log(err);
    });
});

app.get('/categories', function(req, res){
  client.getJokeCategories()
    .then((response) => {
      res.render("categories",{cat: response});

    }).catch((err) => {
      console.log(err);
    });
});







  // Server Started
  app.listen(3000, () => {
    console.log('My first app listening on port 3000!');
  });
