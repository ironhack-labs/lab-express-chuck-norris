const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// our first Route
app.get('/random', (req,res) =>{
  // res.send("holi");
  client.getRandomJoke()
    .then( (response) => {
      res.send(`<p>${response.value}</p>`);
    }).catch((err) => {
    // handle error
    });



});








// Server Started
let port = 3000;
app.listen(port, () => {
  console.log(`My first app listening on port ${port}!`);
});
