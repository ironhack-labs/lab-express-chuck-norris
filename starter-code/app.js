const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


//Random Joke Page
app.get('/random', (req, res, next) => {
  console.log(req);
  
  client.getRandomJoke().then(function (response) {
    res.send('<p>' + response.value + '<p>') 
}).catch(function (err) {
    console.log(err)
});

});

//Categories
app.get('/categories', (req, res, next) => {
  var query = req.query.cat;

  if(query === undefined){
      client.getJokeCategories().then(function (response) {
        res.render('categories', {'array': response})
    }).catch(function (err) {
        console.log(err)
    });
  } else{
    client.getRandomJoke(query)
    .then(function (response) {
      res.render('joke-by-category',
         response)
      })  
      .catch(function (err) {
        console.log(err)
    });
  }
  

});

//Random Joke From Category
// app.get('/categories', (req, res, next) => {
//   console.log(req);
  


// });

//Search Page
app.get('/search', (req, res, next) => {
  res.render('search-form')
});

app.post('/search', (req, res, next) => {
  console.log(req.body.search)
  client.search(req.body.search).then(function (response) {
    res.render('search-result', response)
   
  }).catch(function (err) {
    console.log(err)
  });

});

app.get('/', (req, res, next) => {
  res.render('index')
});




//Listen for Requests
app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});


