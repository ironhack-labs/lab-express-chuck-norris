/*jshint esversion: 6 */
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {

  client.getRandomJoke()
  .then((response) => {
    // use the esponse here
    console.log(response);
    res.send( `<p>${response.value}</p>`);
  }).catch((err) => {
    // handle error
  });
});

app.get('/categories', (req, res, next) => {
if(req.query.cat === undefined){
  client.getJokeCategories()
    .then((response)=>  {
      // use the response here
      res.render("categories",{categories:response});

    })
    .catch((err)=> {
      // handle error
    });
}else{

  client.getRandomJoke(req.query.cat)
  .then((response) => {
    // use the esponse here
       res.send( `<p>${response.value}</p>`);
  }).catch((err) => {
    // handle error
  });

}

});
app.get('/search', (req, res, next) => {
    res.render("search-form");

});

app.post("/search", (req, res, next) => {

  client.search(req.body.term)
  .then(function (response) {
    // to stuff here

   res.render("getjokes",{joke:response.items});

  }).catch(function (err) {
    // handle error
  });

});

app.get('/', (req, res, next) => {
    res.render("index");

});
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
