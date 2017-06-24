const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.set('layout', 'master-layout.ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// ROUTES --------------------------------
app.get('/', (req, res, next)=>{
  res.render('home.ejs');
});

app.get('/random', (req, res, next)=>{
  client.getRandomJoke().then((jokeInfo) =>{
    const punchLine = jokeInfo.value;
    res.render('random.ejs',{
      theJoke: punchLine
    });
  });
});

app.get('/search', (req, res, next)=>{
  res.render('search.ejs');
});

app.get('/categories', (req, res, next)=>{
  client.getJokeCategories().then((jokeCategory) =>{
    const jokeCategories = jokeCategory;
    const categoryPicked = req.query.categoryName;
    res.render('categories.ejs',{
      jokeCategories: jokeCategories
    });
  });
});

app.get('/jokebycategory', (req, res, next)=>{
  const categoryPicked = req.query.cat;
  console.log(categoryPicked);
  client.getRandomJoke(categoryPicked).then((jokeObject) =>{
    res.render('joke-by-category.ejs',{
      theJoke: jokeObject.value,
      categoryPicked: req.query.cat
    });
  });
});



app.listen(3000);
