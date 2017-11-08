const express = require('express');
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


require('./routes')(app, client);

app.listen('3000', () => {
  console.log('Puerto 3000');
});
