const express = require('express');
const app = express();

const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs")

app.get('/random', function (req, res){
  client.getRandomJoke().then((response) => {
    var data = response;
    res.render('index', data);
  }).catch((err) => {
    console.error(err);
  });
});

app.get('/categories', function (req, res){
  client.getJokeCategories().then((response) => {
    console.log(response);
    var data = response;
    res.render('categories', {data});
  }).catch((err) => {
    console.error(err);
  });
});

app.listen(3000, () => console.log("Listening on Port 3000"))
