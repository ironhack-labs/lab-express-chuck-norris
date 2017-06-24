const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
app.locals.result = [];

client.getRandomJoke().then((jokeInfo) => {
  console.log('Random Joke!');
  console.log(jokeInfo);
  console.log(jokeInfo.value);
})
.catch((err) => {
  console.log('ERROR');
});

app.use(bodyParser.urlencoded({extended: true}));
// app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts.ejs');


app.get('/', (req,res,next)=> {
  client.getRandomJoke().then((jokeInfo)=>{
      console.log(jokeInfo.vaule);
      res.render('index.ejs', {
        theJoke:jokeInfo.vaule
      });
  });

});

app.get('/random', (req,res, next) => {
  client.getRandomJoke().then((jokeInfo)=>{
      console.log(jokeInfo.value);
      res.render('random.ejs', {
        theJoke:jokeInfo.value
      });
    });
});

app.get('/categories', (req,res, next) => {
  client.getJokeCategories().then((jokeArray)=>{
      // console.log(jokeArray);
      res.render('categories.ejs', {
        jokesList:jokeArray
      });
    });
});

app.get('/jokeCategoryPage', (req,res, next) => {
  const clickedLink = req.query.cat;
  client.getRandomJoke(clickedLink).then((jokeInfo)=>{
      console.log(jokeInfo.value);
      res.render('joke-by-category.ejs', {
        clickedLink:req.query.cat,
        theJoke:jokeInfo.value

      });
    });
});

app.get('/search', (req, res, next) => {

  res.render('search-form.ejs');
});

app.post('/search', (req, res, next) => {
  const searchReq = req.body.searchField;
  client.search(searchReq).then((searchResult) => {
    console.log(searchResult);
   res.render('search-form.ejs',
  { result: searchResult.items }
 );
 }).catch(function (err) {
   console.log('error');
 });

});


app.listen(3000);
