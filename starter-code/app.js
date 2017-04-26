/*jshint esversion: 6*/
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const morgan     = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.get('/random', (req, res, next) => {
  var jokeValue;
  client.getRandomJoke()
  .then((response) => {
    console.log(response);
    jokeValue = response.value;
    res.render('index', {joke: jokeValue});
  }).catch((err) => {
    // console.log(err);
    // jokeValue = response.value;
    // res.render('index', {joke: jokeValue});
    // handle error
  });

});

app.get('/categories', (req, res, next) => {
  var jokeCategoriesValue;
  var jokeCategorySelectedValue;
  client.getJokeCategories()
  .then((response)=>  {
    // use the response here
    // console.log(response);
    let cat = req.query.cat;
    if(cat!==undefined)
    {
      jokeCategoriesValue = response;
      client.getRandomJoke(cat)
      .then((response) => {
        jokeCategorySelectedValue = response.categories[0];
        res.render('joke-by-category', {jokeCategories: jokeCategoriesValue, jokeCategorySelected:jokeCategorySelectedValue});
      }).catch((err) => {
        // handle error
      });
    }
    else
    {
      jokeCategoriesValue = response;
      res.render('joke-by-category', {jokeCategories: jokeCategoriesValue, jokeCategorySelected:""});
    }
  })
  .catch((err)=> {
    // handle error
  });



});
//
// app.get('/saved',(request,response,next)=>{
//   console.log("get " + request.query);
//   response.send(`saved ${request.query.name} with email ${request.queryemail}`);
// });




app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
