const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
let randomJoke;

app.get("/random", (req, res)=>{
  client.getRandomJoke().then((response)=>{
    console.log(response);
  res.render("random", response);

  }).catch((err)=>{
    console.log(err);
  })
})

app.get("/categories", (req, res)=>{
  let categories = {};
  client.getJokeCategories().then((response)=>{
    categories = {array:response};
    res.render('categories', categories);
  }).catch((err)=>{
    console.log(err);
  })
})

app.get('/categories/:category', (req, res) => {
  client.getRandomJoke(req.params.category)
  .then((response)=>  {
    res.render('joke-by-category', response);
  })
  .catch((err)=> {
    console.error(err);
  });
});

  app.listen(3000, () => {
     console.log("MY first app listening on port 3000!");
   });
