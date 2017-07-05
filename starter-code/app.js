const express = require('express')
const app = express()
const Chuck  = require('chucknorris-io')
const client = new Chuck()

require('./routes.js')(app)

app.listen(3000, () => {
  console.log('The server is listening in the port 3000')
})
