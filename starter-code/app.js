const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/random", (req, res, next) => {
    client.getRandomJoke()
  .then((response) => {
     // console.log(response);
    res.send(`<p>${response.value}</p>`);
  }).catch((err) => {
      console.log(err);
    res.send(err);
  });
});

app.get("/categories", (req, res, next) => {
    client.getJokeCategories()
  .then((response)=>  {
    console.log(response);  
    //res.send(`<p>${response}</p>`);
    res.render("categories",{lapin: response});
  })
  .catch((err)=> {
    console.log(err);
    res.send(err);
  });
});
// app.get("/search", (req, res, next) => {});
app.listen(3000, () => {
    console.log("I'm ready!");
  });