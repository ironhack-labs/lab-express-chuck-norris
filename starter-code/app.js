const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
app.use(express.static("public"));

app.set("views",__dirname+"/views");
app.set("view engine", "ejs");

app.get('/', (req, res, next) => {
    console.log(req);
    res.render('index');
  });

  app.get('/random', (req, res, next) => {
    console.log(req);
    client.getRandomJoke()
  .then((response) => {
    let joke=response.value;
    res.render("index",joke)
  }).catch((err) => {
   
  });
    });

  app.get('/categories', (req, res, next) => {
    console.log(req);
    res.send('<p>Welcome Ironhacker. :)</p>');
  });

  app.get('/search', (req, res, next) => {
    console.log(req);
    res.send('<p>Welcome Ironhacker. :)</p>');
  });


  app.listen(3000, () => {
    console.log('My first app listening on port 3000!')
  });