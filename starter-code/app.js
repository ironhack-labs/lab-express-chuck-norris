const express = require('express')
const app = express()
const Chuck = require('chucknorris-io')
const client = new Chuck()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

app.use(expressLayouts)
app.set('layout', 'index')

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then((response) => {
      res.render('random-joke', {
        joke: response
      })
    }).catch((err) => {
      console.log("Unable to get a random joke")
    })
})

app.get('/categories', (req, res) => {
  client.getJokeCategories()
    .then((response) => {
      res.render('categories', {
          categories: response,
          url: "http://localhost:3000/categories?cat="
        }).catch((err) => {
          console.log("Error retrieving categories");
        });
    })
})





let port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
