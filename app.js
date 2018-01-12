const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (request, response, next) => {
  response.render('index');
});

app.get('/random', (request, response, next) => {
  response.render('index');
});

app.get('/categories', (request, response, next) => {
  response.render('index');
});

app.get('/search', (request, response, next) => {
  response.render('index');
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
