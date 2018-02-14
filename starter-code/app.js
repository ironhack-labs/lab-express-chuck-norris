const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

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
  console.log(req);
  
  client.getJokeCategories().then(function (response) {
    res.render('categories', {'array': response})
}).catch(function (err) {
    console.log(err)
});


  
});

app.get('/categories?cat=', (req, res, next) => {
  console.log(req);
  
  client.getRandomJoke().then(function (response) {
    res.render('joke-by-category', response)
}).catch(function (err) {
    console.log(err)
});


  
});


//Listen for Requests
app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});


