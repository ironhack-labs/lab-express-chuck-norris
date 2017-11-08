const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');


app.set('views', __dirname + '/views');
// app.set('layout', 'views/index');
app.set('view engine', 'ejs');
// app.use(expressLayouts);
// app.use(express.static('/'));


app.get('/', (request, response, next) => {
    console.log(request);
    response.send('<p>hola get</p>');
});

app.get('/random', (request, response, next) => {
    client.getRandomJoke()
    .then((joke) => {
       response.render('index', {data: joke.value} )
    }).catch((err) => {
      console.log(err)
    });
});

app.get('/categories', (request, response, next) => {
    client.getJokeCategories()
    .then((joke) => {
       response.render('categories', {dataArray: joke} )
    }).catch((err) => {
      console.log(err)
    });
    
});

app.get('/categories', (request, response, next) => {
    client.getJokeCategories(request.query.cat)
    .then((joke) => {
       response.render('joke-by-category', {joke} )
    }).catch((err) => {
      console.log(err)
    });
    
});

app.get('/search', (request, response, next) => {
    console.log(request);
    response.send('<p>Welcome Ironhacker. :)</p>');
});


app.listen(3000, () => {
    console.log('My first app listening on port 3000!')
});