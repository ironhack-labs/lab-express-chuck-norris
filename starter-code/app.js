const express = require('express')
const app = express()
const Chuck = require('chucknorris-io')
const client = new Chuck()

// Require path to prevent an Eslint error using app.set('views', __dirname + '/views')
const path = require('path')

// Require body-parser to be able to get info from the req.body with POST
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))

// Require layouts to keep your code DRY
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

// sets the directories for views and layouts (first views since layouts is inside views)
// app.set('views', __dirname + '/views')
app.set('views', path.resolve(__dirname, 'views'))
app.set('layout', 'layouts/main-layout')

// EJS will be in charge of rendering the HTML
app.set('view engine', 'ejs')

// Get /random for a random joke
app.get('/random', (req, res) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      res.send(response.value)
    }).catch((err) => {
      throw err
    })
})

// Get /categories to show all categories or a joke if you click on any of them
app.get('/categories', (req, res) => {
  if (req.query.cat) {
    client.getRandomJoke(req.query.cat)
      .then((response) => {
        res.render('joke-by-category', {
          joke: response.value,
          viewStatus: 'getJoke' // This is used to choose which view will be shown
        })
      }).catch((err) => {
        throw err
      })
  } else {
    // Retrieve a random chuck joke
    client.getJokeCategories()
      .then((response) => {
        res.render('joke-by-category', {
          categories: response,
          viewStatus: 'getCategories' // This is used to choose which view will be shown
        })
      }).catch((err) => {
        throw err
      })
  }
})

// Get /search to search a joke by keyword
app.get('/search', (req, res) => {
  res.render('search-form', {
    viewStatus: 'search' // This is used to choose which view will be shown
  })
})

// Post /search to show a joke depending on the keyword written on the form
app.post('/search', (req, res) => {
  client.search(req.body.keyword)
    .then(function (response) {
      res.render('search-form', {
        jokes: response.items,
        viewStatus: 'showJokes'
      })
    }).catch((err) => {
      throw err
    })
})

// Get / to navigate to the other pages
app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {})
