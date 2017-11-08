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

app.get('/categories', (request, response, next) => {
if (request.query.cat === undefined){
  client.getJokeCategories().then((res) => {
            response.render('categories',  {chisteCat : res});
            }).catch((err) => {
        console.log ("Chuck ha muerto Categories.")
      });
    } else {
      client.getJokeCategories().then((res) => {
            response.render('joke-by-category',  {chisteCat : res});
            console.log('joke');
            }).catch((err) => {
        console.log ("Chuck dies")
          });
    }
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
