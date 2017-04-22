const express = require('express');
const expressLayouts = require ('express-ejs-layouts');
const bodyParser = require ('body-parser');
const Chuck  = require('chucknorris-io');
const app = express();

const client = new Chuck();

app.set('view engine','ejs');
app.set('layout','layouts/main-layout.ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res,next)=>{
  res.render('index.ejs');
});

app.get('/random', (req, res, next)=>{
// Retrieve a random chuck joke
  client.getRandomJoke().then((jokeData) => {
    console.log(jokeData.value);
    res.render('random-joke.ejs',
      {joke : jokeData.value
      });
    }).catch((err) => {
    // handle error
    });
  });

app.get('/category',(req, res, next)=>{
  if (req.query.cat ===undefined) {
  client.getJokeCategories().then((categoryData)=>  {
      console.log(categoryData);
      res.render('categories.ejs',
    { category : categoryData});
  });
} else {

}
});
//fill in the rest here



app.get('/search',(req, res, next)=>{
  res.render('search.ejs',
  {

  });
});

app.listen(3000);
