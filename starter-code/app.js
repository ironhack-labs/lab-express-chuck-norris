const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('layout', 'layout/index');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", (req, res, next) => {
    res.render("index");
});

app.get('/categories', (request, res, next) => {
  console.log(request);
  
  client.getJokeCategories().then((response)=>  {
    let categories = response;
    res.render('categories', {categories});
  })
  .catch((err)=> {
    // handle error
  });
})

app.get('/random', (request, res, next) => {
  console.log(request);
  
// Retrieve a random chuck joke
client.getRandomJoke().then((response) => {
    console.log(response);
    let quote=response.value;
    res.render('randomJoke', {quote});
  }).catch((err) => {
    // handle error
  });

});

app.get('/search', (request, response, next) => {
    console.log(request);
    
    response.render('search-form');
    client.search(searchTerm)
     .then(function (response) {
    console.log("LOL??");
    }).catch(function (err) {
      // handle error
    });
   
});


app.listen(3001, () => {
    console.log("listening!!!");
});
