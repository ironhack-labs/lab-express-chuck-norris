const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.get('/random', (request, response, next) => {
  client.getRandomJoke()
  .then((res) => {
    // use the response here
    console.log(res);
    response.send(`<p>${res.value}</p>`);

  }).catch((err) => {
    console.log('Error');
    // handle error
  });
  // next();
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
