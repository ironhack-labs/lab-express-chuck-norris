const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Chuck = require('chucknorris-io');
const client = new Chuck();

const app = express();

app.use(express.static('public'));
app.use(expressLayouts);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('layout', 'layouts/main-layouts.ejs');

app.set('views', 'views');
app.set('view engine', 'ejs');

///////   HomePage /////////
app.get('/', (req, res, next) => {
  console.log('HOME PAGE');
  res.render('home-view.ejs');
});

/////   Random PAGE   //////
app.get('/random-view', (req, res, next) => {
  console.log('RANDOM PAGE');

  client.getRandomJoke()
  .then((response) => {
    let theJokes = response.value;

    res.render('random-view.ejs', {
      joke: theJokes
    });
  }).catch((err) => {
    res.send("OOooopppss got an Error!");
  });
});

/////// Categories PAGE ////////////
app.get('/categories-view', (req, res, next) => {
  console.log('Categories PAGE');

  client.getJokeCategories()
  .then((response) => {
    let categories = response;

                                  //array mentioned on assignment
                                  //      |         |
  res.render('categories-view.ejs', {category: categories});
  }).catch((err) => {
  });
});

// Retrieve a random chuck joke from the given category ///
app.get('/joke-by-category', (req, res, next) => {
  console.log('Categories PAGE');
  let category = req.query.category;

client.getRandomJoke(category)
.then((response) => {
  let jokes= response.value;

res.render('joke-by-category.ejs', {category: category, joke: jokes});
}).catch((err) => {

  });
});


////// Searching ---Wasn't able to finish -_-///////// 
app.post('/search-view', (req, res, next) => {
  console.log('SEARCH PAGE');
  let searchTerm = req.body.searchTerm;


  client.search(searchTerm)
 .then((response)=>{
   let jokeA = response.items;


res.render('search-view.ejs');

 }).catch((err)=>{

 });

});

app.listen(3000);
console.log('This App is Alive...Somewhat..lol.');
