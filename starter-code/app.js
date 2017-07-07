const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const mychuck = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const port = 3000;
const bodyParser = require('body-parser');
// ...


app.use(express.static('public'));
 /* New */
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('layout', 'layouts/index');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (request, response, next) => {

  response.render('main');

});


app.get('/random', (request, resp, next) => {
  mychuck.getRandomJoke()
    .then((response) => {
     let quote = response.value;
     resp.render('random', {quote});
   }).catch((err) =>{
     resp.send("ERROR");
   });
});

app.get('/categories', (request, resp, next) => {
  mychuck.getJokeCategories().then((response) => {
      let categories = response;
      resp.render('categories', {categories});
  });

});

app.get('/search', (request, resp, next) => {

      resp.render('search-form' );
});

app.post('/search', (request, resp, next) => {
  let query=request.body.cat;
  let joke="";

  mychuck.search(query).then((response) => {
      let jokeslist=response.items;
      jokeslist.map((item) => {
        joke = joke + "<p>" + item.value +"</p> <br>" ;
      });
      resp.send( {joke} );
  });
});


app.get('/category', (request, resp, next) => {
  let catType=request.query.cat;
    mychuck.getRandomJoke(catType).then((response) => {
      let categoryjoke = response.value;
      let category;
      category=response.categories[0];
      let data = { "categoryjoke": categoryjoke, "category": category  }
      resp.render("category", data);
  });

});

app.listen(port, () => {
  console.log("My first app listening on port " + "port");
});
