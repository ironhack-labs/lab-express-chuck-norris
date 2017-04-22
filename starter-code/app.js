//sandra

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

const app = express();

app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

app.set ('views', 'views');
app.set('view engine', 'ejs');


app.get('/', (req, res, next)=>{
  res.render('home-view.ejs');
});

app.get('/random', (req, res, next)=>{

    client.getRandomJoke().then((jokeData) => {

      console.log('Here is the joke info');
      console.log(jokeData);

      res.render('random-view.ejs',
      {
        joke:jokeData.value
      });
    });
});

app.get('/joke-by-category', (req, res, next)=>{

    client.getRandomJoke('<%oneCategory%>').then((response) => {

      console.log('Response:');
      console.log(response);

      res.render('joke-by-category.ejs',
      {
        joke:response
      });
    });
});

app.get('/categories', (req, res, next)=>{
if(req.query.cat === undefined){
  client.getJokeCategories().then((response) => {

    console.log('Here is the joke category:');
    console.log(response);

  res.render('categories-view.ejs', {
    category: response,
    });
  });
}
else {
  client.getRandomJoke(req.query.cat).then((jokeData)=>{
    console.log(`\ngetRandomJoke(${req.query.cat})`);
    console.log(jokeData);
    res.render('joke-by-category.ejs',
        {
          joke:jokeData.value,
          category:req.query.cat
        }
      );
    });
  }
});

app.get('/search', (req, res, next)=>{
  res.render('search-view.ejs');
});

app.post('/search', (req, res, next) => {
  client.search( req.body.keyword )
    .then((searchData) => {
      console.log(`\nsearch(${req.body.keyword})`);
      console.log(searchData);

      res.render(
        'search-results-view.ejs',
        {
          searchResults: searchData.items,
          searchTerm: req.body.keyword
        }
      );
    })
    .catch((error) => {
      console.log(`\nERROR!! search(${req.body.keyword})`);
      console.log(error);

      res.render(
        'search-results-view.ejs',
        {
          searchResults: [],
          searchTerm: req.body.keyword
        }
      );
    });
});


app.listen(3030);
