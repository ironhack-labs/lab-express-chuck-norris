const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const Chuck = require('chucknorris-io');
const client = new Chuck();

// app.use(expressLayouts);

// Configure views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.set('layout', 'index');


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random', (req, res) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      // use the response here
      res.render('random', {response});
    }).catch((err) => {
      // handle error
    });
});

app.get('/categories', (req, res) => {
  // console.log(req.query.cat);
  if (!req.query.cat) {
    client.getJokeCategories()
      .then((response) => {
        let responseObj = {
          categories: response
        };
        res.render('categories', responseObj);
      });
  } else {
    client.getRandomJoke(req.query.cat).then((response) => {
      res.render('joke-by-category', {response});
    });
  }

});



app.get('/search', (req, res) => {
});

app.listen(4000, () => {
  console.log('My first app listening on port 4000!');
});
