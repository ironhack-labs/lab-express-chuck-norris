const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function (req, res, next) {
    res.render("index");
    next();
});


app.get("/random", function (req, res, next) {
    client.getRandomJoke()
  .then((response) => {
    //console.log("esto es lo que recibio de la llamada")
    //console.log(response);
    // convierto la response en un objeto llamado chiste
    //para poder llevrlo a mi index.ejs
    res.render("index",{chiste:response.value});
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get("/categories", function (req, res, next) {
    client.getJokeCategories()
    .then((response)=>  {
        console.log(response);
        res.render("categories",{category:response});

      // use the response here
    })
    .catch((err)=> {
        console.log(err);
      // handle error
    });
    //response.forEach(element => console.log(element));
        
    
  
});


// app.get("/search", function (req, res, next) {
//     res.render("index");
//     next();
// });


app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log("Tu servidor esta funcionando en el puerto 3000")
});