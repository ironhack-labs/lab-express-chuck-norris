const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('views'));

app.get('/', (request, response, next) => {
  response.render('index');
});


app.get('/random', (request, response, next) => {
    client.getRandomJoke().then((res) => {
        let chiste = res;
        response.render('random', chiste);
  }).catch((err) => {
    console.log ("Chuck ha muerto.")
  });
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
