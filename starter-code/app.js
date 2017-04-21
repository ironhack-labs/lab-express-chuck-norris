/*jshint esversion:6*/
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', 'views');
app.set('view engine', 'ejs');


app.get('/random',function(request,response){
  console.log("started-random");

  client.getRandomJoke().then(function (joke) {
    // console.log(joke);
    // response.send(`<p>${joke.value}</p>`);
    response.render('index',{
      categories: joke.value
    });
  });

});


app.get('/categories',function(request,response){
  client.getJokeCategories()
    .then((categories)=>  {
      response.render('joke-by-category.ejs',{categories});
    });
});


  // app.get('/categories/dev',function(request, response){
  //   client.getJokeCategories()
  //   .then((categories)=>  {
  //     client.getRandomJoke(categories).then(function (joke) {
  //       response.render('joke-by-category.ejs',{categories});
  //     })
  //   .catch((err)=> {
  //     console.error(err);
  //   });
  //   });
  // });

app.get('/categories/:cat',function(request, response){
  let choice = request.params.cat;
  client.getJokeCategories()
  .then((choice)=>  {
    client.getRandomJoke(choice).then(function (joke) {
      response.render('joke-by-category.ejs',{categories:choice});
    })
  .catch((err)=> {
    console.error(err);
  });
  });
});


// app.post('/search', function(request,response){
// const txt = request.client.text;
//
//   txt.then((category)=>  {
//     client.search(txt).then(function (search) {
//       response.render('form.ejs'),{
//         categories: search.value
//       };
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
//     });
//   });

app.listen(3000, () => {
  console.log('Running on port 3000');
});
