const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/random", (request, res)=> {
    client.getRandomJoke()
      .then((response) => {
        console.log(response);
        res.send(`<p>${response.value}</p>`);
      }).catch((err) => {
        // handle error
    });
 });

app.get("/categories", (request, res)=> {
  if (request.query.cat === undefined) {
  client.getJokeCategories()
    .then((response)=>  {
      res.render('categories', {categories:response });
    })
    .catch((err)=> {
      // handle error
    });
  } else {
    client.getRandomJoke(request.query.cat)
  .then((response) => {
    res.render('joke-by-category', {joke:response.value});
    console.log(response, request.query.cat);
    // use the response here
  }).catch((err) => {
    // handle error
  });
  }
  });


app.listen(3000, () =>{
  console.log("listen");
});
