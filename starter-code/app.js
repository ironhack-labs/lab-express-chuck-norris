const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    res.render('index', {response: response.value});
  }).catch((err) => {
    console.log(err)
  });
  
});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
  .then((response)=>  {
    let dev = req.query.dev;
    let sport = req.query.sport;
    res.render('categories', {response: response.value});
  })
  .catch((err)=> {
    console.log(err);
  });
});

app.listen(3000, () => {
  console.log("Port 300");
});