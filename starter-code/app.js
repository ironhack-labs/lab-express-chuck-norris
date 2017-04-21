const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

let randomJoke;

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');




app.get('/random', (req, res) => {

  client.getRandomJoke().then(function (response) {
console.log(response);
    randomJoke = response.value;
    res.render('random',{joke:randomJoke})

  }).catch(function (err) {
    console.log("wrong joke");
  });

});


app.get('/categories', (req, res) => {

  client.getJokeCategories().then((response)=>  {

    let listCategories = response;

    let data = {
      categories : listCategories
    }
    res.render('categories',data)

  }).catch(function (err) {
    console.log(err);
  });

});



app.get('/categories/:category', (req, res) => {

  client.getRandomJoke().then(function (response) {


  for (var key in response) {
    if (response.categories[0] === req.params.category) {
      res.send(`That's your joke!, ${response.value}`)
    }
  }

})

});



app.get('/search', (req, res) => {
  res.render('search')
});


app.listen(3000, () => {
  console.log('Chuck Norris is on port 3000!')
});
