/*jshint esversion:6*/

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require ('express-ejs-layouts');
const bodyParser = require('body-parser');



app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random',(req,res,next)=>{

 client.getRandomJoke()
    .then((joke) => {
       let randomJoke = joke.value;
      res.send(`<p>${randomJoke}</p>`);
    })
    .catch((err) => {
      res.send(err);
    });
});



app.get('/categories',(req,res,next)=>{
  client.getJokeCategories()
    .then((response)=>  {
      res.render('categories',{cat:response});
    })
     .catch((err)=> {
      // handle error
   });
});

   app.get('/joke-by-category', (req, res, next) => {

  client.getRandomJoke(req.query.cat)
  .then((joke) => {
      let randomJoke = joke.value;
    res.send(`<p>${randomJoke}</p>`);
    // use the response here
  }).catch((err) => {
    // handle error
  });
});

app.get('/search',(req,res,next)=>{
  res.render('search-form',{result:undefined});
});


app.post('/search', (req,res,next)=>{
  client.search(req.body.searchWord)
    .then(function (response) {
      let result =response.items.map((elem)=>elem.value);

      res.render('search-form', {result:result});
    }).catch(function (err) {
      // handle error
    });
});

app.get('/home',(req,res,next)=>{
  res.render('home',{result:undefined});
});

app.listen(3002, () => {
  console.log('My first app listening on port 3002!');
});
