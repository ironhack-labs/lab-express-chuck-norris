/*jshint esversion: 6*/

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');


app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req , res, next)=>{
  res.render('index');
});


app.get('/random', (req, res, next)=> {

  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      // let temp = response.value;
      res.render('random',{
        joke: response.value
      });
      // console.log(response.value);
    }).catch((err) => {
      res.send('Chuck is not here right now - please leave a message');
    });
});

app.get('/categories', (req, res, next)=> {

  client.getJokeCategories()
    .then((response)=>  {
      let array = response;
      res.render('categories',{categories: array});
    // console.log(response);
    })
    .catch((err)=> {
      res.send('Chuck is not here right now - please leave a message');
    });
    if(req.query.cat){
      client.getRandomJoke(req.query.cat)
      .then((response) => {
        res.send(response.value);
      }).catch((err) => {
        res.send('Chuck is not here right now - please leave a message');
      });
    }
});

app.get('/search', (req, res, next) => {
  res.render('search-forms');
});

app.post('/search', (req, res, next) => {

  // res.render('search-forms');
  let searchTerm = req.body.keyword;
  client.search(searchTerm)
  .then(function (response) {
    let randomNumber = Math.floor(Math.random()*response.items.length);
    res.send(response.items[randomNumber].value);
  })
  .catch(function (err) {
    res.send('Chuck is not here right now - please leave a message');
  });
});

app.listen(3000, () => {
  console.log('Chuck');
});
