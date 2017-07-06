const Chuck = require('chucknorris-io');
const client = new Chuck();
module.exports = (app) => {


  app.get('/', (req, res) => {
    res.render('index');
  });


  app.get('/random', (req, res) => {
    client.getRandomJoke()
      .then((response) => {
        let joke = {
          randomJoke: response.value
        };
        console.log(response);
        res.render('random', joke);
      }).catch((err) => {
        console.log("Error in random jokes");
      });

  });


  app.get('/categories', (req, res) => {
    if(Object.keys(req.query).length === 0) {
      client.getJokeCategories()
        .then((response) => {
          let jokesCategories = {
            categories: response,
          };
            res.render('categories', jokesCategories);
        })
        .catch((err) => {
          // handle error
        });
    } else {
      let jokeReq = req.query;
      console.log(jokeReq);
      client.getRandomJoke(jokeReq)
        .then((response) => {
          let joke = {
            randomJoke: response.value
          };
          console.log(response);
          res.render('joke-by-category', joke);
        }).catch((err) => {
          console.log("Error in random jokes");
        });
    }
  });

  app.get('/search', (req, res) => {
    res.render('search-form', {items: null});
  });

  app.post('/search', (req, res) => {
    let searchTerm = req.body.key;
    console.log(searchTerm);
    client.search(searchTerm)
      .then(function (response) {
        console.log(response);
        res.render('search-form', response);
      }).catch(function (err) {
        // handle error
      });
  });



};
