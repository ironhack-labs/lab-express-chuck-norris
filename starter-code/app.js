const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      // use the response here
      res.send('<p>'+response.value+'</p>');
    }).catch((err) => {
      // handle error
      console.log("Error");
    });

});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
  .then((response)=>  {
    // use the response here
  //  res.send('<p>'+response.value+'</p>');
    res.render('categories',{categories: response});
  })
  .catch((err)=> {
    // handle error
    console.log("Error");
  });
});

app.get('/search', (req, res, next) => {

});


app.listen(3000);
