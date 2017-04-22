const express = (require('express'));
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const morgan = (require('morgan'));

const app = express();

const Chuck  = require('chucknorris-io');
const client = new Chuck();



app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout.ejs');


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));





app.get('/', (req, res, next) => {


  client.getRandomJoke()
    .then( (response) => {
      res.render('home-view.ejs', response);
    }).catch( (err) => {
      console.log("There was an error");
    });
  });


app.get('/random', (req, res, next) => {

  client.getRandomJoke()
    .then( (response) => {
      res.render('random-view.ejs', response);
    }).catch( (err) => {
      console.log("There was an error");
    });
});


app.get('/categories', (req, res, next) => {

  client.getJokeCategories()

    .then( (response) => {
      console.log(response);

      const data = {
        categoryList: response,
        category: req.query.cat
      };

      if (data.category === undefined) {
      res.render('categories.ejs', data);
      }
      else {
        client.getRandomJoke(data.category)
          .then( (response) => {
            res.render('category-view.ejs', response);
          }).catch( (err) => {
            console.log("There was an error");
          });
        }
      }).catch( (err) => {
        console.log("There was an error");
      });
});


app.get('/search', (req, res, next) => {
  res.render('search-form.ejs');
});

app.post('/search', (req, res, next) => {

  client.search(req.body.query)
  .then( (response) => {
    if (response.count <= 10 || response.count === undefined || response.count === null) {
      res.render('no-results.ejs');
    }
    else if (response.count > 10 ) {
      res.render('search-results-10.ejs', response);
    }
    else {
      res.render('search-results.ejs', response);
    }
  }).catch( (err) => {
    res.render('no-results.ejs');
  });
});

app.listen(3000);
