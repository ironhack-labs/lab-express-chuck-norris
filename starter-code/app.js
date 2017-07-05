const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/random', (req, res) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      res.send(response.value);
    }).catch((err) => {});
});


app.get('/categories', (req, res) => {
      client.getJokeCategories()
      .then((response) => {
        console.log(`Response tal cual es: ${response}`);
        var obj = {
          categories: response
        };
        console.log(`Obj es: ${obj}`);
        res.render('categories', obj);
      })
      .catch((err) => {
        console.log(`Aqui hay un error primo ${err}`);
      });

});


app.get('/categories/:category', (req, res) => {
  client.getRandomJoke(req.params)
    .then((response) => {
      res.send(response.value);
    }).catch((err) => {});
});

app.listen('3050', () =>{
  console.log("esto va");
});
