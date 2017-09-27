const express = require('express');
const Chuck  = require('chucknorris-io');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/categories', (req, res) => {
  let cat = req.query.cat;
  client.getRandomJoke(cat)
  .then((randomJoke) => {
    res.render('categories', {
      randomJoke
    }
  );
  }).catch((err) => {
    console.log(err);
  });
});

app.post('/search', (req, res) => {
  let jokeKeyword = req.body.jokeKeyword;
  client.search(jokeKeyword)
  .then((searchedJoke) => {
    res.render('search', {
      searchedJoke
    }
  );
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
