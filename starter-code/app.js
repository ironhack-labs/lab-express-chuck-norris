const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function(req, res, next){
  res.send();
  next();
});



app.get("/random", function(req, res, next){
    // Retrieve a random chuck joke
  client.getRandomJoke()
  .then((response) => {
    // use the response here
  res.render("index", {chiste:response.value});
  })
  .catch((err) => {
    console.log(err)
    // handle error
  });
});

app.get("/categories", function(req, res, next){
  client.getJokeCategories( )
  .then((response)=>  {
  console.log(response);
    // use the response here
    res.render("categories", {categoria:response})

  })
  .catch((err)=> {
    console.log(err)
    // handle error
  });
});



app.get("/search", function(req, res, next){
  res.send();
  next();
});










app.listen(3000, function(err){
  if(err) console.log(err);
  console.log("Your server is functioning correctly at port 3000");
})











/*


//1. --import the library
const express = require ("express");

//2. instance of express
const app = express();

//indicamos los estaticos

app.use(express.static("public"));

//indicamos el motor de views

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//from here we write our routes req is what we receive from the browser, res is what we send from the server

app.get("/dulces", function(req, res, next){
  res.send("Traigan Tributos!");
  next();
});

app.get("/", function (req, res, next){
  return res.render("index");
  next();
});

app.get("/aboutus", function (req, res, next){
  return res.render("aboutus", {lance:"PIZZA"});
  next();
});

app.use(function(){
  console.log("HELLO SERVER");
});
*/
