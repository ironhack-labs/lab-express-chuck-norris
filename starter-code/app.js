const express = require('express')
const app = express()
const Chuck  = require('chucknorris-io')
const client = new Chuck()


app.get('/random', (req, res) => {
  let joke
  client.getRandomJoke()
    .then((response) => {
      joke = response
      res.send(`<img src="${joke.iconUrl}"/><p> ${joke.value}</p>`)
    }).catch((err) =>{

    })
})

app.get('/categories', (req, res) => {
  let {cat} = req.query

  if(cat) {
    client.getRandomJoke(cat)
      .then((response) => {
        joke = response
        res.render('joke-by-category.ejs', {category: cat, joke: joke})
      }).catch((err) =>{

      })
  } else {
    let categories
    client.getJokeCategories()
      .then((response) => {
        categories = response

        res.render('categories.ejs', {categories: categories})
      }).catch((err) =>{

      })
  }
})

app.listen(3000, () => {
  console.log('The server is listening in the port 3000')
})
