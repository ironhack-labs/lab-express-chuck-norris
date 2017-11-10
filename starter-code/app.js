const express = require('express');
const ejsLayout=require("express-ejs-layouts");
const bodyParser=require ("body-parser");
const Chuck  = require('chucknorris-io');

const app = express();
const client = new Chuck();

app.set("view engine","ejs");
app.use(ejsLayout);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// ***********************For the APP *******************************

app.get ("/",(req,res,next)=>{
      res.render("homepage.ejs");
});



app.get("/random",(req, res, next)=>{
  client.getRandomJoke()
    .then((response)=>{
      //"response" contains the joke date
      console.log("Joke Data:",response);
      console.log(response);
      res.locals.chuckJoke=response.value;
      res.render("random.ejs");
      //render a view to display the joke
      //then and catch are part of promise objects
    })
    .catch ((err)=>{
      //this will get called only if there's an error
      console.log("Joke ERROR:");
      console.log(err);
      //render an error view (like a 404 page)
    });
}); //GET /random


app.get("/categories",(req,res,next)=>{
  client.getJokeCategories()
  .then((response)=>  {
    console.log("Category:",response);
    res.locals.categoryList=response;
    res.render("categories.ejs");
  })
  .catch((err)=> {
    console.log("Category ERROR");
    console.log(err);
  });

}); //GET /categories



app.get("/joke-by-category",(req,res,next)=>{
  // Retrieve a random chuck joke
let categoryVar=req.query.category;

//console.log(req.query)
// {cat:food}

client.getRandomJoke(categoryVar)
  .then((response) => {
    console.log(response);
    res.locals.categoryA=response.categories;
    res.locals.jokeByCategory=response.value;
    res.render("joke-by-category.ejs");
  }).catch((err) => {
    console.log("Joke ERROR:");
    console.log(err);
    // handle error
  });

});

app.get("/search",(req,res,next)=>{
res.render("search-form.ejs");
}); //GET SEARCH



app.post("/search",(req,res,next)=>{

  let searchEntered=req.body.searchValue;
  console.log(searchEntered);

  client.search(searchEntered)
    .then((response)=> {
          console.log(response.items);
          res.locals.jokeArray=response.items;
          res.render("search.ejs");

      // to stuff here
    }).catch(function (err) {
      console.log("Joke ERROR:");
      console.log(err);
    });


}); //POST SEARCH

// ***************For the TERMINAL************************

//client.getRandomJoke is asynchronous, so we need to add a callback function
//the getRandomJoke method returns  promise
// client.getRandomJoke()
//   .then(()=>{
//     //response contains the joke date
//     console.log("Joke Data:",response);
//     //use joke data here
//     // console.log("Random Joke:");
//     // console.log(response.value);
//
//   })
//   .catch (()=>{
//     //this will get called only if there's an error
//     console.log("Joke ERROR:",err);
//     //^it's important to console.log the response because you need to know what
//     //to handle it (i.e. array vs object)
//   });

// listen ***********

app.listen(3000);
