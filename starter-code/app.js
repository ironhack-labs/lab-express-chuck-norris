const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.use(express.static('public'));

// app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/random', (req, res, next) => {

// Retrieve a random chuck joke
client.getRandomJoke()
  .then((answer) => {
    res.render('random',{content:answer});
    console.log(answer.categories)
   // use the response here
  }).catch((err) => {
    console.log("lol")
  });

});


app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
    .then((answer) => {
      res.render('categories',{content:answer});
   // use the response here
  }).catch((err) => {
    console.log("lol")
  });
});


app.get('/categories/:cat', (req, res, next) => {

  console.log(req.params);
// Retrieve a random chuck joke
client.getRandomJoke(req.params.cat)
  .then((answer) => {
    res.render('random',{content:answer});
   // use the response here
  }).catch((err) => {
    console.log("lol")
  });
});

  app.listen( 3000, () => {
    console.log('Listening in port 3000');
  })