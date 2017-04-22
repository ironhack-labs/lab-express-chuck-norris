const express = require('express');
const eLayouts = require('express-ejs-layouts');
const bParser = require('body-parser');
const morgan = require('morgan');
const Chuck  = require('chucknorris-io');

const app = express(); //wasn't 100% what this does
const client = new Chuck(); //I could assume it runs the chuck norris joke creator

app.set('views', 'views'); //sets the views folder
app.set('view engine', 'ejs'); //sets the view engine to use ejs files, because of this you don't have to type main.ejs you could type main cause of this
app.set('layout', 'layouts/main.ejs'); //this is the template that all of the pages are going to follow.... or layout

app.use(morgan('dev')); //this puts the morgan middleware to dev mode to give us useful messages in the console
app.use(express.static('public')); //this is telling express where to find the static files... so the root directory for pics/css/js and stuff
app.use(eLayouts); //telling the app not to forget to actually use the layouts framework that was called up there
app.use(bParser.urlencoded({ extended: true })); //so these are some of the default settings of the body-parser, but in essence lets you send key value pairs from forms and other front end inputs to the backend without showing it in the url. (it's encoded)

// app.use((req, res, next) => {
//   //insert code here
//   console.log("You just connected to the backend");
// });

//render the home page when the person visits the / root directory
app.get('/', (req, res, next) => {
  res.render('chucks-home.ejs');

});

//any other routes go below this ----------------------------------
//sorts the Chuck Norris jokes by category, should have a menu for users to select cat
app.get('/categories', (req, res, next) => {
  res.render('categories.ejs');

});

//generates a random Chuck Norris joke
app.get('/random', (req, res, next) => {
  res.render('random.ejs');

});

//lets you search for a chuck norris joke that contains a certain string
app.get('/search', (req, res, next) => {
  res.render('search.ejs');

});

//about this Chuck Norris joke page
app.get('/search', (req, res, next) => {
  res.render('search.ejs');

});

//any forms or inputs that need to post go below this -----------------------
// app.post('/blah blah', (req, res, next) => {
//   res.render('blah blah.ejs');
//   //could put code here too
// });

app.listen(3000);
