const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    // use the response here
    res.render('index', {
      joke: response
    });

  }).catch((err) => {
    // handle error
    console.log(err)
  });
});

app.get('/categories', (req, res, next) => {
  let category = req.query.cat;
  if(category){
    client.getRandomJoke(category)
    .then((response) => {
      res.render('joke-by-category', {
        joke: response.value,
        category: category
      })
    }).catch((err) => {
      // handle error
      console.log(err)
    });
  }else{
    client.getRandomJoke()
    .then((response) => {
      res.render('categories', {
        categories: response
      });
      }).catch((err) => {
        // handle error
        console.log(err)
    });
  }
});

app.get('/form', (req,res) => {
  res.render('search-form');
});

app.post('/search', (req,res,next) =>){
  let search = req.body.keyword;
  if(search){
    client.search(search){
      .then((response) => {
        res.render('jokes',{
          jokes: response,
          search: search
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }else{
    res.render('search-form');
  }
}

app.listen(3000);
