const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'views/index')

app.use(express.static('static'));

app.get('/', (request, response, next) => {
  response.send('chuck norris');
});

app.get('/random', (request, response, next) => {
  client.getRandomJoke().then((data) => {
    console.log(data);
    response.render('random', data);
  }).catch((err) => {
    console.log('error');
    response.send('error');
  });
});

app.get('/categories', (request, response, next) => {
  client.getJokeCategories().then((data) => {
    console.log(data);
    let jokeCat = {
      array : data
    };
    response.render('categories', jokeCat);
  }).catch((err) => {
    console.log('error');
    response.send('error');
  });
});

app.listen(3000, () => {
  console.log('chuck norris');
})