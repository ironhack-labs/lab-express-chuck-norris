const express = require('express');
const bodyParser = require('body-parser');
const Chuck  = require('chucknorris-io');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const client = new Chuck();

app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended : true}));
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

// our first Route:
//this is the path to random
app.get('/random', (request, response, next) => {
  client.getRandomJoke()
  .then((myJoke) => {
    const joke = myJoke.value;
    response.render('index.ejs', {joke})
  }).catch((err) => {
    
    // console.log("Sorry, there is a problem");
  });
  
});

app.get('/categories', (request, response, next) => {
  client.getJokeCategories()
  .then((response) =>  {
    console.log('got categories');
    response.render('categories', {response });
  })
  .catch((err)=> {
    // handle error
  });
  
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});




