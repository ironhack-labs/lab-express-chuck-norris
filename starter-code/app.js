const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random', (req, res) => {
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((randomJoke) => {
    console.log(randomJoke);
    res.render('random', {
      randomJoke // same as : randomJoke: randomJoke
    });
    // use the response here
  }).catch((err) => {
    // handle error
    console.log(err);
});
});

app.get('/joke-by-category', (req, res) => {
  // Retrieve a random chuck joke
client.getJokeCategories()
  .then((jokeCategory) => {
    console.log(jokeCategory);
    res.render('joke-by-category', {
      jokeCategory
    });
    // use the response here
  }).catch((err) => {
    // handle error
    console.log(err);
});
});

app.get('/joke-by-category', (req, res, category) => {
  // Retrieve a random chuck joke
client.getRandomJoke(category)
  .then((randomJoke) => {
    res.render('random', {
      randomJoke
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});

// 4 routes to create :

// /- The homepage with a description and links to the other pages
// /random- To display a random joke
// /categories - To display a joke by category
// /search - To search for a joke by keyword (so it will have to display a form to be filled by the user)
