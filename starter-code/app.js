const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get('/', (request, response, next) => {
    // console.log("method: " + request.method, "path: " + request.path, request.query);
    response.send('<p>Welcome Ironhacker. :)</p>');
  });

app.get('/random', (req, res, next) => {
    res.render('random');
  });

app.listen(3010, () => {
    // console.log('My first app listening on port 3000!')
  });

