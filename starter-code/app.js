/*jshint esversion:6*/

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');



app.use(express.static('public'));
//app.use(expressLayouts);
//app.set('layout', 'layouts/main-layout');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (req,res,next)=> {
  res.render('index');
});

app.get('/random', (req,res,next)=> {

  client.getRandomJoke()
  .then((response) => {
    // use the response here
    let randomJoke = response.value;
    res.send(` <p> ${randomJoke} </p> `);

  }).catch((err) => {
    // handle error
  });

});

app.get('/listcategories', (req, res, next)=> {
  client.getJokeCategories()
    .then((response)=>  {
      // use the response here
      console.log(response);
      res.render('listcategories', {cat: response});
    })
    .catch((err)=> {
      // handle error
    });

});



app.get('/categories', (req,res,next)=> {
//  console.log(req.query.cat);
  //res.send(req.query.cat);

  // Retrieve a random chuck joke
  client.getRandomJoke(req.query.cat)
  .then((response) => {
    // use the response here
    let randomJoke = response.value;
    res.send(` <p> ${randomJoke} </p> `);
  }).catch((err) => {
    // handle error
  });

});

app.get("/home", (req, res, next)=>{
  res.render('home');
});

app.get("/search", (req, res, next)=>{
  res.render('search-form', {result: undefined});
});

app.post("/search", (req, res, next)=>{
  client.search(req.body.searchWord)
  .then(function (response) {
    // to stuff here
    let result = response.items.map((elem) => elem.value);
    res.render("search-form", {result: result});
    console.log(result);
  }).catch(function (err) {
    // handle error
  });
});

// app.get('/search', (req, res, next)=>{
//
//   res.render('search');
// });

// app.post('/searchData', (req,res,next)=> {
//   client.search(req.body.searchWord)
//   .then(function (response) {
//     // to stuff here
//     console.log(response);
//     //res.send(response.items);
//     res.send(response.items[0].value);
//     //res.render('searchData', {jokeItems:response.items}  );
//   }).catch(function (err) {
//     // handle error
//   });
// });

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
