const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.use(express.static('public'));


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

app.get('/search', (req, res, next)=>{
  res.render('search-view.ejs');
});

app.get('/categories', (req, res, next)=>{

  client.getJokeCategories().then((response) => {

    console.log('Here is the joke category:');
    console.log(response);

  res.render('categories-view.ejs', {
    category: response,
    // id: response
  });
});
});


app.listen(3030);
