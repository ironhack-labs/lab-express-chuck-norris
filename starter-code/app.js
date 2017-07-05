/*jshint esversion:6*/
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then((resp) => {


      console.log(resp);
      res.send(`<p> <img src="${resp.iconUrl}"alt=""> ${resp.value} <a href="${resp.sourceUrl}">${resp.sourceUrl}</a></p> `);
    }).catch((err) => {
      console.log(err);
  });
});

app.get('/categories', (req, res) => {
  client.getJokeCategories()
    .then((respo) => {
      let array=respo;
       res.render('categories',array);
      console.log(respo);
    }).catch((err) => {
      console.log(err);
  });
});

app.listen(3000, () => {
  console.log("App is running!");
});
