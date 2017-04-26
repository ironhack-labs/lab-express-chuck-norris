const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

// our first Route
app.get('/random', (requests, res) => {
  client.getRandomJoke().then((response) => {
     res.render('index.ejs', {joke: response.value});
  }).catch(function (err) {
      // handle error
  });
});


client.getJokeCategories()
.then((response)=>  {
  // use the response here
})
.catch((err)=> {
  // handle error
});


app.listen(3000, () => {console.log("conectado");})



// // Retrieve a random chuck joke from the given category
// client.getRandomJoke('dev').then(function (response) {
//     // to stuff here
// }).catch(function (err) {
//     // handle error
// });
//
//
//
//
// // Retrieve a list of available joke categories
// client.getJokeCategories().then(function (response) {
//     // to stuff here
// }).catch(function (err) {
//     // handle error
// });
//
// // Free text search
// client.search(searchTerm).then(function (response) {
//     // to stuff here
// }).catch(function (err) {
//     // handle error
// });
