const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const client = new Chuck();

app.use(bodyParser.urlencoded({extended : true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/index')
app.use(expressLayouts);

app.get('/home', (req, res) => {
  res.render('home');
})

app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then((response) => {
      let joke = response.value;
      res.render('random', { joke });
    }).catch((err) => {
      // handle error
    });
})

app.get('/categories', (req, res) => {
  client.getJokeCategories()
    .then((response)=>  {
      let categories = response;
      res.render('categories', { categories });
    })
    .catch((err)=> {
      // handle error
    });

})

app.get('/search', (req, res) => {
  let jokes = [];
  res.render('search-form', { jokes });
})

app.post('/search', (req, res)=>{
  console.log('method POST', req);
  console.log('body', req.body.keyword);
  client.search(req.body.keyword)
  .then(function (response) {
    console.log(response);

    let jokes = response.items;
    res.render('search-form', { jokes });

  }).catch(function (err) {
    // handle error
  });

})


app.listen(3000, () => {
    console.log('Listening in port 3000');
});
