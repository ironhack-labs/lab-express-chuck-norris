const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));



// ruta: jokeRandom
app.get('/random', (req, res) => {
  // Recuperar una broma de chuck al azar
  client.getRandomJoke().then(function(response) {
    let obj = {
      jokeRandom: response.value
    };
    // La respuesta
    res.render('index', obj);
  }).catch((err) => {
    // mostrar error
    console.log("Error!!");
  });
});

// ruta: categories
app.get('/categories', (req, res) => {
  if (!req.query.cat) {
    console.log(req.query.cat);
    client.getJokeCategories().then(function(response) {
        let obj2 = {
          categories: response
        };
        // use the response here
        res.render('categories', obj2);
      })
      .catch((err) => {
        // handle error
        console.log("Error!!");
      });
  } else {
    client.getRandomJoke(req.query.cat).then((response) => {
      let obj3 = {
        jokeSelected: response.value
      };
      res.render('joke-by-category', obj3);
    });
  }
});





//Activar servidor
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
