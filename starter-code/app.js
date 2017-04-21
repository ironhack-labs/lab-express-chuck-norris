const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');




  app.get('/', function(request,response) {
    console.log('new request');
    response.send('index');

  });


  app.get('/random', function(request,response) {
    client.getRandomJoke().then(function (joke) {
    response.send(joke.value)
}).catch(function (err) {
    // handle error
});

  });


  app.get('/categories', function(request,response) {
    client.getJokeCategories().then(function (rest) {
    response.render('categories',{
      rest:rest
    });
}).catch(function (err) {
    // handle error
});

  });


  /*app.get('/z', function(request,response) {

    response.render('categories.ejs')}*/


app.listen(3000, () => {
  console.log('my first app listening on port 3000!');

});
