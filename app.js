const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser =require('body-parser');


const app= express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res, next)=>{
  res.render('home');
});

app.get('/random-joke', (req, res, next) =>{
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    res.render('index',
    {joke : response.value });
  }).catch((err) => {
    console.log(err);
  });

  });

  app.get('/search', (req, res, next)=>{
    res.render('search-form');
  });

  app.post('/search',(req, res, next)=>{
      const searchterm =req.body.search;
      client.search(searchterm)
        .then((response) => {
          let responses = response[0];
            // console.log("The thing being returned is: " + response);
          res.render('index',
          {joke : response.items[0].value});
        }).catch((err) => {
          console.log(err);
        });
      });

  let categories;

  app.get('/categories', (req, res, next)=>{
  client.getJokeCategories()
  .then((response)=>  {
    categories=response;
    res.render('categories', {
      arrayofCategories: response
    });
    categories.forEach(cat=>{
      app.get(`/categories/${cat}`, (req, res, next) =>{
        // Retrieve a random chuck joke
          client.getRandomJoke(cat)
            .then((response) => {res.render('index',
            {joke : response.value });
          }).catch((err) => {
         console.log(err);
      });

      });
      });
  })
  .catch((err)=> {
    // handle error
  });
});



// app.get('/categories/dev', (req, res, next) =>{
//   // Retrieve a random chuck joke
//     client.getRandomJoke('dev')
//       .then((response) => {res.render('index',
//       {joke : response.value });
//     }).catch((err) => {
//    console.log(err);
// });
//
// });

  app.listen(3000, ()=> {
    console.log('Backend app Online!');
  });
