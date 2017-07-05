const Chuck = require('chucknorris-io');
const client = new Chuck();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
module.exports = (app) => {

  // RUTA 1: Ruta raiz


  app.get('/random', (req, res) => {
    // Retrieve a random chuck joke
    client.getRandomJoke()
      .then((response) => {
        res.send(response.value);
      }).catch((err) => {});
  });


  app.get('/categories', (req, res) => {
    client.getJokeCategories()
      .then((response) => {
        var obj = {
          categories: response
        };
        res.render('categories', obj);
      })
      .catch((err) => {
        console.log(`Aqui hay un error primo ${err}`);
      });
  });

};
