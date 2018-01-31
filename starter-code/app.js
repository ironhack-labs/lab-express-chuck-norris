const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');

//configure app
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const client = new Chuck();


//routes
app.get('/index', (req, res, next) => {
 client.getRandomJoke().
  then((response) => {
    let data = {
      joke: response.value
      
    };
    res.render('index', data);
   }).catch((err) => {
    console.log(err);
   });
});

//start app
app.listen(3001, () => {
  console.log('Easy web dev. 3001!')
});


