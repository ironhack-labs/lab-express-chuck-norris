const express = require('express');
const app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



require('./routes')(app);


app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
