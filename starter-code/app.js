/* jshint esversion: 6 */
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

  client.getRandomJoke().then(function (response) {

    res.render('index',{value:response.value});

  }).catch(function (err) {

    console.log("ERROR");

  });

});


app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
