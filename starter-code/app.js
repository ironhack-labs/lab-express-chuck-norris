const express = require('express');
const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout','index.ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.get('/',(req,res,next) =>{
  res.render("home.ejs");
});

app.get('/random',(req,res,next) =>{
  client.getRandomJoke().then((response) => {
    res.render("random.ejs",{randChuckObject : response});
  });
});

app.get("/categories",(req,res,next) =>{
  const catInput = req.query.cat;
  //if query.cat is defined, show random joke of that catagory
  if(catInput !==undefined){
    client.getRandomJoke(catInput).then((response) => {
      console.log(response);
      res.render("catagoryChosen.ejs",{randChuckObject : response});
    });
  }
  //if query.cat is not defined, show catagories to show.
  else{
    client.getJokeCategories().then((response)=>  {
        res.render("categories.ejs",{catArr:response });
    });
  }

});

app.get("/search",(req,res,next) => {
  res.render("search.ejs");

});

app.post("/searched-joke",(req,res,next)=>{
  const searchTerm = req.body.searchTerm;

  client.search(searchTerm).then(function (response) {
    console.log(response);
    res.render("searchedJoke.ejs",{searchedJokeArr : response, searchTerm : searchTerm});
  });
});


app.listen(3000);
