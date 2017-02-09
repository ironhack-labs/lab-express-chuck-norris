const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));
//app.use(express.static('search'));
//app.use(express.static('random'));
//app.use(express.static('categories'));

//app.set('views','views');
//app.set('view engine','ejs');

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get('/', function (request, response, next) {
  console.log(request);
  response.send('<p>Welcome Ironhacker by george. :)</p>');
  next();
});

app.get('/index',function(request,response){
  response.render(`index.ejs`);
  });

app.get('/random',function(request,response){
  client.getRandomJoke().then(function (joke) {
   response.send(joke.value);
 })
   .catch(function (err) {
       // handle error
   });
});


  app.get('/categories', function(request,response) {
    client.getJokeCategories().then(function (rest) {
    response.render('categories',{
      rest:rest
    });
}).catch(function (err) {
    // handle error
});

  });

// Retrieve a random chuck joke
/*client.getRandomJoke().then(function (response) {

  app.get('/random',function(request,response){
    response
      .render(`index.ejs`, {
      foo: myJoke
    });

}).catch(function (err) {
    // handle error
});
}

*/

/*
app.post('/login',function(request,response){
const name= request.body.name // equivalente a const {name}=request.body
const password = request.body.password
response.send(`wellcome ${name}`)
});

*/

app.listen(3000, () => {
  console.log('App chuck Norris port 3000!');
});


/*
```javascript
const Chuck  = require('chucknorris-io'),
      client = new Chuck();

// Retrieve a random chuck joke
client.getRandomJoke().then(function (response) {
    // to stuff here
}).catch(function (err) {
    // handle error
});

// Retrieve a random chuck joke from the given category
client.getRandomJoke('dev').then(function (response) {
    // to stuff here
}).catch(function (err) {
    // handle error
});

// Retrieve a list of available joke categories
client.getJokeCategories().then(function (response) {
    // to stuff here
}).catch(function (err) {
    // handle error
});

// Free text search
client.search(searchTerm).then(function (response) {
    // to stuff here
}).catch(function (err) {
    // handle error
});
```
*/
