const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');



app.get('/about', (req, res, next) => {
  // display views/about.ejs for the browser
  res.render('about', {
    name: 'Nizar',
    age: 30,
    citiesTraveled: [ 'Miami', 'Madrid', 'Barcelona', 'Paris' ],
    faveFoods: [
      { name: 'pizza slice', calories: 400 },
      { name: 'bagel bites', calories: 380 },
      { name: 'pizza doritos', calories: 450 },
    ]
  });
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
