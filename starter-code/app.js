const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
//indicamos el motor de vistas
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/random", function(req, res, next){
    //req.get("Traigan tributos!");
    client.getRandomJoke()
    .then((response) => {
        res.render("random", {chiste:response.value});
     }).catch((err) => {
    // handle error
    
     });
});
// catgories

app.get("/categories", function(req, res, next){
    //req.get("Traigan tributos!");
    console.log(req)
    if(req.query.cat){
        client.getRandomJoke(req.query.cat)
        .then((response) => {
        // use the response here
        res.render('joke-by-category', {joke:response.value});
        console.log(response)
        }).catch((err) => {
        // handle error
    });
    } else {
        client.getJokeCategories()
    .then((response) => {        
        res.render("categories", {category:response});
     }).catch((err) => {
    // handle error
        
     });
    }
    
});

// app.get('joke-by-category', function(req,res, next){
//     // Retrieve a random chuck joke
//     client.getRandomJoke('dev')
//     .then((response) => {
//     // use the response here
//     res.render('joke-by-category', {joke:response.value});
//     console.log(response)
//     }).catch((err) => {
//     // handle error
//  });
//  });

// search

app.post("/search", function(req, res, next){
    client.search(searchTerm)
  .then(function (response) {
    // to stuff here
  }).catch(function (err) {
    // handle error
  });
});
//final
app.listen(3000, function(err){
    if(err) console.log(err);
    console.log("Tu servidor está funcionando")
})

