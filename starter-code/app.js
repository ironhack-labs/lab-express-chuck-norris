const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("views",__dirname+"/views");
app.set("view engine", "ejs");

app.get('/', (req, res, next) => {
    res.render('index', {joke: 'este es mi index'});
  });

  app.get('/random', (req, res, next) => {
    client.getRandomJoke()
  .then((response) => {
    let pedro=response.value;
    res.render("index",{joke: pedro})
  }).catch((err) => {
   
  });
    });

  app.get('/categories', (req, res, next) => {
    console.log(req);
    client.getJokeCategories()
    .then((response) => {
      res.render("categories",{data:response})
    }).catch((err) => {
     
    });

  });

  app.get('/search', (req, res, next) => {
    console.log(req);
    res.send('<p>Welcome Ironhacker. :)</p>');
  });


  app.listen(3001, () => {
    console.log('My first app listening on port 3001!')
  });