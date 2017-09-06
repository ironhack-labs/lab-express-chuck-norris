const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const layouts = require('express-ejs-layouts');

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.set(layouts)
app.set('layout', 'index')

app.get('/random', (req, res) => {
  client.getRandomJoke().then(function(response) {
    res.send(`<p>${response.value}</p>`)
  }).catch(function(err) {
    // handle error
  })
})

app.get('/categories/:cat', (req, res) => {
  client.getRandomJoke(req.params.cat).then( (response) => {
    res.render(`joke-by-category`,{
      joke: response.value
    })
  }).catch(function(err) {
    // handle error
  })
})

app.get('/categories', (req, res) => {
  client.getJokeCategories().then( (response) => {
    res.render(`categories`,{
      categories: response
    })
  }).catch(function(err) {
    // handle error
  })
})

let port = 3000
app.listen(port, () => {console.log(`Port ${port}`);})
