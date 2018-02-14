const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
var cat = 

//make the views path link stuff work idek
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      console.log(response);
      res.send(`
      <!doctype html>
      <html>
        <head>
          <title>random</title>
        </head>
        <body>
          <img src="${response.iconUrl}" alt="icon url">
          <p>${response.value}</p>
        </body>
      </html>`)
    })
    .catch((err) => {
      //handle error
    });
});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
  .then((response) => {
    console.log({categories: response})
    res.render('categories', {categories: response});
  })
  .catch((err) => {
  })
});

app.get('/randomCategory', (req, res, next) => {
  let category = req.query.cat;
  client.getRandomJoke(category)
  .then((response) => {
    res.render('joke-by-category', response);
  })
  .catch((err) => {
    //handle error
  })
})

app.get('/search', (req, res, next) => {

});

app.listen(3000, () => {
  console.log('Im listening on port 3000 niggu!')
});