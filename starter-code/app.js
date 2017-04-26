const express = require('express');
const app = express();
const expressLayouts =   require('express-ejs-layouts');

const Chuck  = require('chucknorris-io');
const client = new Chuck();





app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Server Started
app.get('/random', (req, res, next) => {
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    let mivalue = {
      name: "Hola"
    };

    res.render('index', response);

  }).catch((err) => {
    // handle error


  });
})

app.get('/categories', (req, res, next) => {
  // Retrieve a random chuck joke
  client.getJokeCategories()
    .then((response)=>  {
      // use the response here
        response.render('joke-by-categories');
    })
    .catch((err)=> {
      // handle error
    });
})

app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
