const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (request, response, next) => {
  client.getRandomJoke()
  .then((joke) => {
    let chiste = joke;
    console.log(chiste);
    response.render('random', chiste);
  }).catch((err) => {
    return err
  });
});

app.get('/categories', (request, response, next) => {
  client.getJokeCategories()
  .then((cat)=>  {
    console.log(cat);
    response.render('categories', {categories : cat});
    // use the response here
  })
  .catch((err)=> {
    return err;
  });
});














app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
