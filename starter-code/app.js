const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((res) => {
      console.log(res.value);
    }).catch((err) => {
      console.log(err);
    })
} )



let port = 3000;
app.listen(port, () => {
  console.log(`My firs joke listening on por ${port}!`)
})
