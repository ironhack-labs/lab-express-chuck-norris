const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then((response) => {
      res.send(`<p>${response.value}</p>`);
    }).catch((err) => {
      // handle error
    });

});

app.get('/categories', (req, res) => {
  client.getJokeCategories()
  .then((result)=>  {
    res.render("categories.ejs", {categories:result} );
  })
  .catch((err)=> {
    // handle error
  });

});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
