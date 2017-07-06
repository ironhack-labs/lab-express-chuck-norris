const express = require('express')
const app = express()
const Chuck  = require('chucknorris-io')
const client = new Chuck()

const bodyParser = require('body-parser')

app.use(bodyParser())

require('./routes.js')(app, client)

app.listen(3000, () => {
  console.log('The server is listening in the port 3000')
})
