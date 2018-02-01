const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get('/random', (req, res, next) => {


client.getRandomJoke()
.then((miChiste)=>{
    res.render('index', { data : miChiste.value})
  }).catch((err) => {
    
  });
});
app.get("/categories", (reque, res, next) => {
  client
    .getJokeCategories  ()
    .then(chisteCat => {
        console.log(chisteCat)
      res.render("joke-by-category", { data: chisteCat });
    })
    .catch(err => {});
});

app.listen(3000)
