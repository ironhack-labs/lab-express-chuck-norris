const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/random", (req, res, next) => {
  client
    .getRandomJoke()
    .then(joke => {
      let randomJoke = joke.value;
      res.render("index", { name: randomJoke });
    })
    .catch(err => {
      // handle error
    });
});

app.get("/categories", (req, res, next) =>{
    client.getJokeCategories()
  .then((categorias)=>  {let myCategory = categorias;
    res.render("categories",{category:myCategory})
    console.log()
 
  })
  .catch((err)=> {
    // handle error
  });
 });
app.listen(3000);