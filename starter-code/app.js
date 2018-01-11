const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


// Retrieve a random chuck joke
app.get('/random', (req,res, next) => {
  client.getRandomJoke().then(function (response) {
    // do stuff here
    res.send(response.value);
    console.log(response);
  }).catch(function (err) {
      // handle error
      //console.log('Entro en el error');
      console.log(err);
  });
});
app.listen(3000, () => { console.log("Ready!") });
