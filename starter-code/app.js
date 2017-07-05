/*jshint esversion: 6 */

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

const bodyParser = require('body-parser');

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));


app.set('layout', 'layouts/main');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



// Retrieve a random chuck joke


app.get('/',(request,response,next) =>{
  response.render('index');
});

app.get('/random',(request,response,next) =>{
  client.getRandomJoke()
    .then((joke) => {
      response.render('random',{joke});
    }).catch((err) => {
      throw err;
      // handle error
    });
});

app.get('/categories',(request,response,next) =>{
  client.getJokeCategories()
  .then((category)=>  {
    response.render('categories',{category});
    // use the response here
  })
  .catch((err)=> {
    // handle error
  });
});

app.get('/category',(request,response,next) =>{
  let category = request.query.cat;
  client.getRandomJoke(category)
  .then((joke) =>{
      response.send(joke.value);
  })
  .catch((err)=>{

  });
});



app.get('/search',(request,response,next) =>{
  response.render("search");
});

app.post('/search',(request,response,next) =>{
  let whatSearched = request.body.search;
  client.search(whatSearched)
    .then(function (found) {
      response.send(found);
      // to stuff here
    }).catch(function (err) {
      // handle error
    });

});



app.listen(3000,() => {
  console.log("Listening in port 3000");
});
