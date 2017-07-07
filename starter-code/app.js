
const express = require('express');
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

////

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true }));

////


app.set('layout', 'layouts/main');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));


////

app.get('/', (req, res, next) => {
  // console.log('/about');
  res.render('index'); 
});

app.get('/random',(req,response,next)=>{
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((res) => {
      let joke = `${JSON.stringify(res.value)}`;
      response.render('random',{joke});
    }).catch((err) => {
      response.send(`Error finding our joke`);
    });
});


app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
  .then((response)=>  {
    let allCategories = response;
    res.render('categories',{allCategories});
    // console.log(allCategories);
  })
  .catch((err)=> {
    res.send(`Error finding all joke categories`);
  });
});

app.get('/categoriess',(req,res,next)=>{
   let theCategory = req.query.cat;
   client.getRandomJoke(theCategory)
   .then((joke)=>{
     res.render('joke-by-category', {joke: joke.value});
   })
   .catch((err) => {
     res.send(`Error finding all joke categories`);
    })
 });


app.get('/search',(req,res,next)=>{
    res.render("search-form");
});

app.post('/search',(req,res,next) => {
  client.search(searchTerm)
  .then(function (response) {
    // to stuff here
  }).catch(function (err) {
    // handle error
  });

});




app.listen(3001, () => {
  console.log('Listening on ---> port 3001!');
});



 
// // Retrieve a list of available joke categories 
// client.getJokeCategories().then(function (response) {
//     // to stuff here 
// }).catch(function (err) {
//     // handle error 
// });
 

