const express = require('express');
const app = express();

const Chuck = require('chucknorris-io');
const client = new Chuck();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static("static"))

app.get('/', (request, response, next) => {
  response.render('index');
  //response.send('<p>Welcome Ironhacker. :)</p>');
});


app.get("/random", (req, res) => {
  client.getRandomJoke()
    .then((joke) => {
      res.render('random', {
        joke: joke.value
      });

    }).catch((err) => {
      // handle error
    });
});

app.get("/categories", (req, res) => {
  client.getJokeCategories()
    .then(function(categoriesFromAPI) {
      res.render('categories', {
        categories: categoriesFromAPI
      });
    }).catch(function(err) {
      // handle error});
    });
});

app.get("/search", (req, res) => {
  res.render('joke-by-category');

});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
