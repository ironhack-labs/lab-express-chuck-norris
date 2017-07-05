const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", (req, res, next) => {
    res.render("index");
});

app.get('/categories', (request, response, next) => {
  console.log(request);
  response.render('categories');
  client.getJokeCategories()
  .then((response)=>  {
    // use the response here
  })
  .catch((err)=> {
    // handle error
  });
})

app.get('/random', (request, response, next) => {
  console.log(request);
  response.render('randomJoke');
// Retrieve a random chuck joke
client.getRandomJoke('dev')
  .then((response) => {
    // use the response here
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
