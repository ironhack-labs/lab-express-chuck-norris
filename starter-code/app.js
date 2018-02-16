const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/random",function(req,res,next){
    client.getRandomJoke()
    .then((response) => {
      console.log(response)
      res.render("index", {chiste:response.value});
    }).catch((err) => {
      console.log("you have an error");
      
});

})

app.get("/categories",function(req,res,next){
    client.getJokeCategories()
    .then((response) => {
      console.log(response)
      res.render("categories", {categories:response});
    }).catch((err) => {
      console.log("you have an error");
      
});

})

      

app.listen(3000,function(err){
    if(err)console.log(err);
    console.log("You're server is working")
})


