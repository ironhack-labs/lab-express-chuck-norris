const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')

// app.use(expressLayouts);
// app.set('layout', 'main-layout');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.get('/random', (request, response) => {
  client.getRandomJoke()
    .then((joke) => {
      console.log(joke);
      response.render('randomjoke', {
        textJoke: joke.value,
        iconJoke: joke.iconUrl
      });
    })
    .catch(err => {});
});

app.get('/categories', (request, response) => {
  client.getJokeCategories()
    .then((cat) => {
      console.log(cat);
      reponse.render('categories', {
        categories: cat
      });
    })
    .catch((err) => {
      // handle error
    });
});

let port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
