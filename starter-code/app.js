const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

// app.get('/random', (req, res) => {
//
// client.getRandomJoke().then(function (response) {
//     console.log(response.value);
//     let data = {};
//     data.random = response.value;
//     res.render('index', data);
// }).catch(function (err) {
//     res.send(err);
// });
//
//
//
// });



app.get('/random', (req, res) => {
  // Retrieve a random chuck joke
  client.getRandomJoke().then(function (response) {
    let joke =  {
      joke: response.value,
    };
     res.render('random',joke);
  }).catch(function (err) {
     res.send(error);
  });
});



// // Retrieve a random chuck joke from the given category
// client.getRandomJoke().then(function (response) {
//    console.log(response);
// }).catch(function (err) {
//    console.log(err);
// });

app.get('/categories', (req, res) => {
client.getJokeCategories().then(function (response) {
  let cat =  {
    categories: response
  };
   res.render('categories',cat);
}).catch(function (err) {
   console.log(err);
   res.send(error);
});
});

app.get('/categories/:category', (req, res) => {

  client.getRandomJoke(req.params.category).then(function (response) {
    console.log(response);
    res.render("joke-by-category", response)
    // to stuff here
}).catch(function (err) {
    // handle error
});

});
// // Free text search
// client.search(searchTerm).then(function (response) {
//    // to stuff here
// }).catch(function (err) {
//    // handle error
// });
app.listen(3000);
