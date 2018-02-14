const express = require('express');
const reload = require('reload');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


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
        <a href="/">Home</a>
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
    //handle error
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
  let data = req.query.searchTerm;
  if (data !== undefined) {
    client.search(data)
    .then((response) => {
      console.log(response);
      res.render('search-form', response)
    })
    .catch((err) => {

    })
  } else {
    res.render('search-form', {items:[]});
  }
});

reload(app);

app.listen(3000, () => {
  console.log('Im listening on port 3000 niggu!')
});

