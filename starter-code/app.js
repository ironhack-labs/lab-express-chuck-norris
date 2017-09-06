const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set("layout" , "index");



// our first Route
app.get('/random', (req, res) => {
  console.log("Me ha llegado la pregunta.");

  client.getRandomJoke()
    .then((response) => {
      res.send(`<p> ${response.value} </p>`);
    }).catch((err) => {
      console.log("Esto no va!");
      // handle error
  });
});
// Retrieve a random chuck joke



app.get('/categories/:cat', (req, res) =>{

  client.getRandomJoke(req.params.cat)
    .then((response)=>  {
      // use the response here
      res.render('joke-by-category', {
        joke: response.value
      });
    })
    .catch((err)=> {
      // handle error
      console.log("Esto no va! 2");

    });


});


app.get('/categories', (req, res) =>{

  client.getJokeCategories()
    .then((response)=>  {
      // use the response here
      res.render('categories', {
        categories: response
      });
    })
    .catch((err)=> {
      // handle error
      console.log("Esto no va! 2");

    });


});



let port = 3000;
app.listen(port, () => {
  console.log(`My app is listening on port ${port}!`);
});
