const express = require('express');
const app = express(); //Initialize Express
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.set('layout','layouts/default');

app.get('/',(request, response, next)=> {
  response.render('index');
});

app.get('/random',(request, response, next)=> {
  var joke;
  client.getRandomJoke()
    .then((joke) => {
      joke=joke.value;
      response.render('random',{joke});
    }).catch((err) => {
      console.log("error");
      response.redirect('/');
    });
});

app.get('/categories',(request, response, next)=> {
  var categories=[];
  client.getJokeCategories()
  .then((categories)=>  {
    categories=categories;
    response.render('categories',{categories});
  })
  .catch((err)=> {
    response.redirect('/');
  });
});

app.get('/category',(request,response,next)=>{
  let category = request.query.cat;
  client.getRandomJoke(category)
  .then((joke)=>{
    console.log(joke.value);
    response.render('joke-by-category', {joke: joke.value});
  })
  .catch((err)=>{console.log(err)})
});

app.get('/search',(request,response,next)=>{
  response.render("search-form");
});

app.post('/search', (req, res) => {
  client.search(req.body.inputkeyword)
  .then(function (response) {
    // to stuff here
    res.render('search',{response});
    console.log("body", request.body);
  }).catch(function (err) {
    // handle error
    console.log("error");
  });
});

app.listen(3000, () => {
  console.log("listening in port 3000")
});
