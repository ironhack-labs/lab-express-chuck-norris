const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const port = process.env.PORT || 4000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      // use the response here
      res.send('<p>'+response.value+'</p>');
    }).catch((err) => {
      // handle error
      console.log("Error");
    });

});

app.get('/categories', (req, res, next) => {
  let cat = req.query.cat;
 if(cat){
  // Retrieve a random chuck joke
 client.getRandomJoke(cat)
 .then((response) => {
   // use the response here
   res.render('joke-by-category',{joke: response.value, category: cat});
 }).catch((err) => {
   // handle error
 });
 }else{
  client.getJokeCategories()
  .then((response)=>  {
    // use the response here
  //  res.send('<p>'+response.value+'</p>');
    console.log(response);
    res.render('categories',{categories: response});
  })
  .catch((err)=> {
    // handle error
    console.log("Error");
  });
 }
  
});

app.get('/form', (req,res) => {

  res.render('search-form');
});


app.post('/search', (req, res, next) => {
  let searchTerm = req.body.keyword;
  if(searchTerm){
  console.log(searchTerm);
  client.search(searchTerm)
  .then(function (response) {
    // to stuff here
    console.log(response);
    res.render('jokes',{jokes: response, searchTerm: searchTerm});
  }).catch(function (err) {
    // handle error
  });
  }else{
    res.render('search-form');
  }

});


app.listen(port);
