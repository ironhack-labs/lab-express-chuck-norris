const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const Chuck  = require('chucknorris-io');
const client = new Chuck();

const expressLayouts = require('express-ejs-layouts');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser());

// Primera ruta: jokeRandom
app.get('/random', (req, res) => {
// Recuperar una broma de chuck al azar
client.getRandomJoke().then(function (response) {
    let obj = {
      jokeRandom: response.value
    };
    // La respuesta
    res.render('index',obj);
  }).catch((err) => {
    // mostrar error
    console.log("Error!!");
  });
});

//Activar servidor
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
