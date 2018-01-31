const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
/*
app.get('/', (req,res) => {
  let hola = "manuel"
  res.render('index', {name: hola});  
});
*/

app.get('/random', (req,res) => {
  client.getRandomJoke()
  .then((response) => {
    // use the response here
    res.render('index', {joke:response.value});   
  }).catch((err) => {
    // handle error
  });  
});

app.get('/categories', (req,res) => {
client.getJokeCategories()
  .then((response)=>  {
    var x = '';
    for (var i = 0; i<response.length; i++) {
       x += (response[i] + '')
    };
    res.render('index', {categories: x})
    res.render('categories',{categories: response});
  }).catch((err)=> {
    // handle error
  }); 
  });



app.listen(3000);