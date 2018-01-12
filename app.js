const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (request, response, next) => {
  response.render('index');
});

app.get('/random', (request, response, next) => {
  client.getRandomJoke()
  .then((res) => {
    response.send(res.value);
    console.log(res);
  }).catch((err) => {
    response.send(res.err);
    console.log(err);
  });
});

app.get('/categories', (request, response, next) => {
  response.render('categories');
});

app.get('/search', (request, response, next) => {
  response.render('search');
});

app.listen(3000, () => {
  console.log('Server ready')
});
