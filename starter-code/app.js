const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const bodyParser = require('body-parser');
const client = new Chuck();

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res,next)=> {

  client.getRandomJoke()
  .then((response) => {

    let joke = response.value;
    res.render('index', {theJoke: joke});
  }).catch((err) => {

  });

});

app.get('/categories', (req,res,next) =>{
  client.getJokeCategories()
  .then((response) => {

    let categories = response;

    res.render('categories', {theCategories: categories});
  }).catch((err) => {

  });
});

app.get('/joke-by-category', (req,res,next) =>{
  let category = req.query.category;
  client.getRandomJoke(category)
  .then((response) => {
    let joke = response.value;
    res.render('joke-by-category', {category: category, joke: joke});
  }).catch((err) => {

  });
});

app.get('/search-chuck-norris-jokes',(req,res,next)=>{

    res.render('search-form', {searchTerm: '', jokeArray: [] });
  });



app.post('/search-chuck-norris-jokes', (req, res, next) => {
  let searchTerm = req.body.searchTerm;
  console.log(searchTerm);

  client.search(searchTerm)
  .then((response)=>{
    let jokeArray = response.items;


    res.render('search-form', {searchTerm: searchTerm, jokeArray: jokeArray});

  }).catch((err)=>{

  });

});

app.listen(3000, () => {
  console.log('Backend is Live!');
});
