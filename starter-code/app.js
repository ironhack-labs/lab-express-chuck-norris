const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.get('/random', (req, res) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      res.send(`<p>${response.value}</p>`);
      // use the response here
    }).catch((err) => {
      // handle error
    });
})


app.get('/categories', (req, res) => {
  // Retrieve a random chuck joke
  client.getJokeCategories()
    .then((categories) => {
      res.render("categories.ejs", {categories:categories});
      // use the response here
    }).catch((err) => {
      // handle error
    });
})




// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
