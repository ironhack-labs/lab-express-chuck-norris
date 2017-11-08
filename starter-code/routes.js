module.exports = (app, client) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/random', (req, res) => {
    client.getRandomJoke()
      .then((joke) => {
        res.render('random-joke', joke);
      }).catch((err) => {
        res.render('random-joke', {value: "It's been an error"});
      });
  });

  app.get('/categories', (req, res) => {
    client.getJokeCategories()
      .then((categories) => {
        let query = req.query.cat;
        let obj = {
          cat: categories,
          joke: undefined
        };
        if (query === undefined) {
          res.render('categories', obj);
        } else {
          client.getRandomJoke(query)
            .then((joke) => {
              obj.joke = joke;
              res.render('categories', obj);
          });
        }
      });
  });
  app.get('/search', (req, res) => {
    res.render('search-form', {joke:undefined});
  });
  app.post('/search', (req, res) => {
    let query = req.body.Search;
    let obj = {
      joke: undefined
    };

      client.search(query)
        .then((joke) => {
          console.log(joke);
          obj.joke = joke;
          res.render('search-form', obj);
        });
    console.log(req.body);
  });
};
