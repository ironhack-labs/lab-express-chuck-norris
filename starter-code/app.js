const express = require('express');
const Chuck  = require('chucknorris-io');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const client = new Chuck();

const myApp = express();

myApp.set('views', __dirname + '/views');
myApp.use(express.static('public'));
myApp.set('view engine', 'ejs');
myApp.use(expressLayouts);
myApp.set('layout', 'layouts/main-layout');
myApp.use(bodyParser.urlencoded({ extended: true }));


myApp.get('/', (req, res, next ) => {
  res.render('index');
});


myApp.listen(3000, () => {
  console.log('Backend app ONLINE!');
});
