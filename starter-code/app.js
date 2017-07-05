const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');



app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'index');

require('./routes')(app);


app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
