const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser());

// RUTE 1: Random
app.get('/random', (req, res) => {
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    let obj = {
      joke: response.value
    };
    // use the response here
    res.render('index',obj);
  }).catch((err) => {
    // handle error
    console.log(`This error is: ${err}`);
  });
});

// RUTE 2: Categories
app.get('/categories', (req, res) => {
  if(!req.query.cat){
  console.log(req.query.cat);
  client.getJokeCategories()
  .then((response)=>  {
    let obj = {
      categories: response
    };
    // use the response here
    res.render('categories', obj);
  })
  .catch((err)=> {
    // handle error
    console.log(`This error is: ${err}`);
  });
}else {
  client.getRandomJoke(req.query.cat).then((response) => {
    res.render('joke-by-category',{jokeSelected: response.value});
  });
}
});



// RUTE 3: joke by keyword
app.get('/search', (req, res) => {
  res.render('search-form');
});

// RUTE 3: joke by keyword
app.post('/user-data', (req, res) => {
  console.log(`The request is: ${req.body.userInput}`);
  client.search(req.body.userInput)
  .then(function (response) {
    // to stuff here
    console.log(response);
    // res.send(response);
  }).catch(function (err) {
    // handle error
    console.log(`This error is: ${err}`);
  });
});



app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
