const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {

  res.render("index");

});

app.get("/random", (req, res, next)=> {
  client.getRandomJoke()
  .then((response) => {
    // use the response here
    console.log(response);
    res.send(`<p> ${response.value}</p>`);
  }).catch((err) => {
    // handle error
  });


});


app.get("/categories", (req, res, next)=> {

  client.getJokeCategories()
  .then((response)=>  {
    // use the response here
    res.render('categories', {res: response});
  })
  .catch((err)=> {
    // handle error
  });
  if(req.query.cat){
    client.getRandomJoke(req.query.cat)
    .then((response) => {
      res.send(response.value);
    }).catch((err) => {
      // handle error
    });
  }


});

app.get("/search", (req, res, next)=>{
  res.render('search-form', {result: undefined});

});

app.post("/search", (req, res, next)=>{
  client.search(req.body.category)
  .then(function (response) {
    // to stuff here
    let result = response.items.map((elem) => elem.value);
    res.render("search-form", {result: result});
    console.log(result);
  }).catch(function (err) {
    // handle error
  });

});

app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
