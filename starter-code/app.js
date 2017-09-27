const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Get a random joke, iteration 1

app.get('/random', (req, res, next) => {

  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      // console.log("DEBUG response:", response);
      res.render('random', {response: response});
      // res.send(response);
      // next();
    }).catch((err) => {
      // console.log("DEBUG err:", err);
      // handle error
      // "<h1>there's an error</h1>"
    });

});

// create a new route for categories
// app.get('/categories', (req, res, next) => {
//   console.log("DEBUG req", req.query)
//
//   client.getJokeCategories()
//   .then((response)=>  {
//     // console.log("DEBUG response:", response);
//     res.render('categories',{response: response});
//   })
//   .catch((err)=> {
//     // console.log("DEBUG err:", err);
//     // handle error
//   });
//
// });

// create a new route for sub categories
app.get('/categories', (req, res, next) => {
  client.getRandomJoke(req.query.cat)
  .then((response)=>  {
    console.log("DEBUG response:", response);
    res.render('joke-by-category',{response: response});
  })
  .catch((err)=> {
    // console.log("DEBUG err:", err);
    // handle error
  });

});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
