const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// our first Route:
/*app.get('/random', (request, response, next) => {
  //console.log(request);
  //response.send('Hola');
  response.send('<p>Welcome Chucknorris. :)</p>');
  //res.render('index');
});*/

// Server Started
app.listen(3000, () => {
  console.log('My first app chucknorris listening on port 3000!');
});



// use the response here
app.get('/random', (req, res) => {
  client.getRandomJoke()
  .then((response) => {
    res.render('index', {data:response.value})
  }).catch((err) => {
    // handle error
  });
    
});


app.get('/categories', (req, res) => {
  client.getJokeCategories()
  .then((response)=>  {
    // use the response here
    res.render('categories', {data:response})

  })
  .catch((err)=> {
    // handle error
  });
    
});

app.get('/categories', (req, res) => {
  let dev = req.query.cat;
  //res.render('joke-by-category', {data:dev});
  client.getRandomJoke()
  .then((response) => {
    // use the response here
    res.render('joke-by-category', {data:response})
  }).catch((err) => {
    // handle error
  });
    
});

