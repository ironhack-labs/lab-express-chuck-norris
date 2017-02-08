const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));// Define carpeta
app.set('views', `${__dirname}/views`);// Define carpeta

app.get('/', function (request, response, next) {
  console.log("no random");
  response.send('<h1>Please Put random on URL</p>');
});

app.get('/random', function(request,response){
  console.log("New JOKE REQUEST");
  // Retrieve a random chuck joke
  client.getRandomJoke().then(function (joke) {
      console.log(joke);
      // to stuff here
      const jokeOne = joke.value;
      response
      //.send(`<h1>Random Joke of the moment: </h1><br> <p>${jokeOne}</p>`);
      .render('index.ejs',{jokeOne});
  }).catch(function (err) {
      // handle error
  });
});



app.get('/categories', function(request,response){
  console.log("New categories REQUEST");
    client.getJokeCategories()
      .then((jokeCategories)=>  {
        response
         .render('categories.ejs',{jokeCategories});

       console.log(jokeCategories);
    })
    .catch((err)=> {
      console.error(err);
    });
});

app.get('/categories/:name', function (request, response, next) {
  const name= request.params.name;
  client.getRandomJoke(name).then(function (joke) {
    console.log(joke);
    // to stuff here
    const jokeOne = joke.value;
    response
    //.send(`<h1>Random Joke of the moment: </h1><br> <p>${jokeOne}</p>`);
    .render('index.ejs',{jokeOne});
  }).catch(function (err) {
      // handle error
  });

});


app.listen(3000,() =>{
  console.log("My first app listening on port 3000!!");
});
