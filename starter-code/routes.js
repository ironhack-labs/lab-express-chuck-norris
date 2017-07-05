const Chuck  = require('chucknorris-io');
const client = new Chuck();


module.exports = (app) => {
  const bodyParser = require('body-parser');
  app.use(bodyParser());
  app.get('/', (req, res) => {

    res.render();
  });


  app.get('/random', (req, res) => {

    // Retrieve a random chuck joke
    client.getRandomJoke()
      .then((response) => {

        res.render('random', response);
        // use the response here
      }).catch((err) => {
        console.log(err);
      });

  });

  app.get('/categories', (req, res) => {
    if (req.query.cat) {
      client.getRandomJoke(req.query.cat)
        .then((response) => {

          res.render('joke-by-category', response);
          // use the response here
        }).catch((err) => {
          console.log(err);
        });

    }else {
    client.getJokeCategories()
  .then((response)=>  {
    let obj = {
      categories: response
    };
    // use the response here

      res.render('categories', obj);
  })
  .catch((err)=> {
    // handle error
  });
}

  });

  app.get('/search', (req, res) => {

    res.render('search-form',req);
  });

  app.post('/search', (req, res) => {

    if (req.body.busqueda) {
      client.search(req.body.busqueda)
        .then(function (response) {

            res.render('search-form',response);
        }).catch(function (err) {
          // handle error
        });
    }


  });
};
