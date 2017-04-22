const express = require('express');
const expressLayouts = require ('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const app = express();

const client = new Chuck();

app.set('view engine','ejs');
app.set('layout','layouts/main-layout.ejs');
app.use(express.static('public'));
app.use(expressLayouts);
// app.use(expressLayouts);

app.get('/', (req, res,next)=>{
  res.render('index.ejs');
});

app.get('/random', (req, res, next)=>{
// Retrieve a random chuck joke
  client.getRandomJoke()
    .then((randomJoke) => {
    console.log(randomJoke.value);
    res.render('random-joke.ejs',
    {
      joke : randomJoke.value
    });
    // use the response here
    }).catch((err) => {
    // handle error
    });


});



app.get('/category',(req, res, next)=>{
  client.getJokeCategories()
    .then((category)=>  {
      console.log(category);
      res.render('categories.ejs',
    {
      category : category
    });
  }) .catch((err)=> {
      // handle error
    });
});

// 
// app.get('/search',(req, res, next)=>{
//   res.render('joke-by-category.ejs',
//   {
//
//   });
// });

app.listen(3000);
