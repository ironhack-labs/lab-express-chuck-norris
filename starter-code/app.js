const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req,res) =>{
  client.getRandomJoke()
    .then( (response) => {
      res.send(`<p>${response.value}</p>`);
    }).catch((err) => {
    // handle error
    });
});

// let arrayJokes = client.getJokeCategories();

app.get('/categories', (req,res) =>{

  client.getJokeCategories()
  .then((response)=>  {
    // res.send(response);
    res.render('categories', {
      array: response,
    });
  })
  .catch((err)=> {
    // handle error
  });
});

app.get('/joke', (req,res) =>{
  client.getRandomJoke( req.query.cat )
    .then( (response) => {
      res.render('joke-by-category', {
        joke: response.value,
      });
    }).catch((err) => {
    // handle error
    });
});










// Server Started
let port = 3000;
app.listen(port, () => {
  console.log(`My first app listening on port ${port}!`);
});
