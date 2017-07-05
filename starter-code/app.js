const express = require('express')
const app = express()
const Chuck  = require('chucknorris-io')
const client = new Chuck()


app.get('/random', (req, res) => {
  let joke
  client.getRandomJoke()
    .then((response) => {
      console.log(response.value)
      joke = response.value
      res.send(`<p> ${joke}</p>`)

    }).catch((err) =>{

    })
})

app.listen(3000, () => {
  console.log('The server is listening in the port 3000')
})
