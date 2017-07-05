const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", (req, res, next) => {
    res.render("index");
});

app.listen(3001, () => {
    console.log("listening!!!");
});

client.getJokeCategories()
  .then((response)=>  {
    // use the response here
  })
  .catch((err)=> {
    // handle error
  });

// Retrieve a random chuck joke
client.getRandomJoke('dev')
  .then((response) => {
    // use the response here
  }).catch((err) => {
    // handle error
  });

  client.search(searchTerm)
  .then(function (response) {
    // to stuff here
  }).catch(function (err) {
    // handle error
  });