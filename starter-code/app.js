const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (request, response, next) => {
  client.getRandomJoke()
  .then((res) => {
    // use the response here
    response.render('index', res);

  }).catch((err) => {
    // handle error
    throw new Error(err.message);
  });
});

app.get('/categories', (request, response, next) => {
  console.log(request.query);
  if(Object.keys(request.query).length === 0) {
    client.getJokeCategories()
    .then((res) => {
      // use the response here
      response.render('categories', {categories : res});
      console.log(res);

    }).catch((err) => {
      // handle error
      throw new Error(err.message);
    });
  } else {
    client.getRandomJoke(request.query.cat)
  .then((res) => {
    // use the response here
    console.log(res);
    response.render('joke-by-category', res);
  }).catch((err) => {
    // handle error
  });
  }
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
