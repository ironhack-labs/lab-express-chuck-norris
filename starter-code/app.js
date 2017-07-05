/*jshint esversion: 6 */

const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then((response) => {
      //res.render("raw", {response: response});
      res.render("raw", {response});

    }).catch((err) => {
      res.send("<p> An error ocurred </p>");
    });
});

app.get('/categories', (req, res) => {

  let {cat} = req.query;

  if (cat) {
    client.getRandomJoke(cat)
      .then((response) => {
        let obj = {
          response: response.value,
          category: response.categories[0]
        };
        //console.log(obj);
        res.render("joke-by-category", obj);
      }).catch((err) => {
        res.send("<p> An error ocurred </p>");
      });

    } else {
    client.getJokeCategories()
      .then((response) => {
          categories= response;
        res.render("categories", categories);
      })
      .catch((err) => {
        res.send("<p> An error ocurred </p>");
      });
  }
});


app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});


// Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    // use the response here
  }).catch((err) => {
    // handle error
  });
