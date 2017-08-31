const express = require('express');
const router = express.Router();
const Chuck = require('chucknorris-io');
const client = new Chuck();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/random', (req, res) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then(response => {
      res.locals.random = response.value;
      res.render('pages/random');
    }).catch(err => {
      // handle error
    });
});

router.get('/categories', (req, res) => {
  client.getJokeCategories()
    .then(response => {
      res.locals.categories = response;
      res.render('pages/categories');
    })
    .catch((err)=> {
      // handle error
    });
});

router.get('/category/:cat', (req, res) => {
  const cat = req.params.cat;

  client.getRandomJoke(cat)
    .then(response => {
      res.locals.category = response.value;
      res.render('pages/category');
    }).catch((err) => {
      // handle error
    });
});

router.get('/search', (req, res) => {
  res.render('pages/search');

  // const searchTerm = req.body.searchTerm;
  // console.log(searchTerm)
  
  //   client.search(searchTerm)
  //     .then(response => {
  //       res.locals.searchResult = response.value;
  //       res.render('pages/search-results');
  //     }).catch(err => {
  //       // handle error
  //     });
});

router.post('/search-results', (req, res) => {
  const searchTerm = req.body.searchTerm;
  
    client.search(searchTerm)
      .then(response => {
        res.locals.searchResult = response.items[0].value;
        // console.log(response);
        res.render('pages/search-results');
      }).catch(err => {
        console.log('Something is wrong in the promise');
      });
});

module.exports = router;
