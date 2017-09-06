const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
app.use(express.statis('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', _dirname + "views");
app.set('layout', 'layout/main-layout');
app.set('view-engine', 'ejs');

app.get('/', (req, resp, next) => {
    resp.render('index');
})

app.get('/random', (req, resp, next) => {
    resp.render('random');
})

app.get('/categories', (req, resp, next) => {
    resp.render('categories');
})

app.get('/search', (req, resp, next) => {
    resp.render('search');
})

