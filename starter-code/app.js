  const express = require('express');
  const expressLayouts = require('express-ejs-layouts');
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const Chuck  = require('chucknorris-io');
  const client = new Chuck();

  const app = express();


  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/main-layout.ejs');
  // ------------------------------------
  app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use(expressLayouts);
  app.use(bodyParser.urlencoded({ extended: true }));


  app.get('/', (req, res, next) => {
      res.render('home-view.ejs');
  });

  app.get('/random', (req, res, next) => {
    client.getRandomJoke().then((jokeData) => {
      console.log(jokeData);
      quote = jokeData.value;
      res.render('random.ejs', {
        joke: quote
      });
    }).catch((err) => {
      console.log('Something went wrong');
    });
  });

  app.get('/category', (req, res, next) => {
    client.getJokeCategories().then((array)=>  {
      categories = array;
      res.render('categories.ejs', {
        display: categories
      });
   }).catch((err)=> {
      console.log('Something went wrong');
   });
  });


  app.get('/joke-category', (req, res, next) => {
    client.getRandomJoke(req.query.cat).then((categories) => {
      newOne = categories;
    res.render('joke-by-category.ejs', {
      catGory: newOne
      });
    });
  });

  app.get('/search', (req,res,next) => {
        res.render('search.ejs',{
      });
  });



app.listen(3000);
