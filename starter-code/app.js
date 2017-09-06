const express = require('express');
const Chuck  = require('chucknorris-io');
const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const client = new Chuck();
const app = express();

app.use(expressLayout)
app.set('layout', 'index')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true}))

let myQuery
let myBody

app.get('/random', (req, response, next) => {
  client.getRandomJoke()
    .then((resolve) => {
      response.render ('joke' , {random : resolve})
    }).catch((err) => {
      console.log(err);
    })
  })

  app.get('/categories', (req, response, next) => {
    client.getJokeCategories()
      .then((res) => {
        myQuery = req.query.cat
        response.render ('categories' , {cat : res})
      }).catch((err) => {
        console.log(err);
      })
    })

  app.get(`/joke-by-category/:query`, (req, response, next) => {
    client.getRandomJoke(req.params)
    .then((res) => {
      console.log(res)
      response.render('joke-by-category', {joke: res})
    }).catch((err) => {
      console.log(err)
    })
  })

app.get('/search', (req, res, next) => {
  res.render('search-form.ejs')
})

app.post('/search', (req, res, next) => {
  client.search(req.body.jocke)
    .then(function(response){
      console.log(response.items[0].value);
    }).catch(function(err){
      console.log(err)
    })

})





let port = 3000;
app.listen(port, () => {
  console.log(`My firs joke listening on por ${port}!`)
})
