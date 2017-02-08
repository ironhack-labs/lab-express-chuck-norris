const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get('/random', (req, res) => {
  client.getRandomJoke().then(function (response) {
      res.render("random", response);
  }).catch(function (err) {
      res.send("no chuck norris jokes at this time");
  });
});


app.get('/categories', (req, res) => {
  client.getJokeCategories().then(function (response) {
    let data = {
        cats: response
      };
      res.render('categories', data);
  }).catch(function (err) {
      res.send("no chuck norris jokes at this time");
    });
  });

  app.get('/categories/:data', (req, res) => {
    client.getRandomJoke(req.params.data).then(function (response) {
      res.render("joke-by-category", response);
    }).catch(function (err) {
    res.send("no chuck norris jokes at this time");
});
});


app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
