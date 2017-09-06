const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

app.use(express.static('public'));
app.use(myFakeMiddleware)
// app.use(bodyParser.urlencoded({extended: true}));


function myFakeMiddleware(req, _, next){
  console.log("myFakeMiddleware was called!");
  req.secretValue = "swordfish";
    next();
}

app.use(morgan('dev'));

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  res.render('index');
});


app.get('/random',(req,res,next) => {

  // Retrieve a random chuck joke
  client.getRandomJoke()
  .then((response) => {
    console.log(response);

    res.locals.joke = response.value;

    res.render('random');
  });

});

app.get('/categories',(req,res,next) => {

  // Retrieve a random chuck joke
  client.getJokeCategories()
  .then((response) => {
    console.log(response);

    res.locals.jokeCategories = response;

    res.render('categories');
  });

});

app.get('/:categoryName', (req, res, next) => {
   const category = req.params.categoryName;

   // Retrieve a random chuck joke
   client.getRandomJoke(category)
  .then((response) => {
    res.locals.joke = response.value;
    res.render('joke-by-category');
  });
});


app.get('/search', (req, res, next)=> {
  res.render('searchForm');
});
//
//
// app.get('/search-results',(req,res,next) => {
//
//
//   const myTerm = req.query.mySearchTerm;
//
//   client.search(myTerm).then(function (response) {
//
//     console.log("HERE!");
//
//     var randomIndex = Math.floor(Math.random() * response.items.length);
//
//     console.log(response.items[2].value);
//     console.log(response.items[randomIndex].value);
//     res.locals.joke = response.items[randomIndex].value;
//
//
//     res.render('search-results.ejs');
//   });
//
// });



app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
