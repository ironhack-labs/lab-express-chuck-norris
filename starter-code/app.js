const express = require('express');
const app = express();
const bodyParser      = require('body-parser');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get('/random', (req, res) => {

  client.getRandomJoke().then(function (response) {
      let data = {
        random: response.value,
      };
      res.render('index', data);
  }).catch(function (err) {
      console.log(err)
      res.send(err);
  });
  // console.log(data);

});



app.get('/categories', (req, res) => {

  client.getJokeCategories()
  .then((response)=>  {
    let data = {
      categories: response,
    };
    res.render('categories', data);
  })
  .catch((err)=> {
    console.error(err);
    res.send(err);
  });
});

app.get('/categories/:category', (req, res) => {

  client.getJokeCategories()
  .then((response)=>  {

    client.getRandomJoke(`${req.params.category}`).then(function (response) {
    // to stuff here
      let data = {
        random: response.value,
      };
      res.render('joke-by-category', data);

    }).catch(function (err) {
      console.error(err);
      res.send(err);
    });

  })
  .catch((err)=> {
    console.error(err);
    res.send(err);
  });
});


// app.get('/search', (req, res) => {
//
//   client.search(searchTerm).then(function (response) {
//     console.log("hellooo");
//     res.render('search-form', data);
//   }).catch(function (err) {
//     console.log(err)
//     res.send(err);
//   });
//
// });

app.get('/search', (req, res) => {
  res.render('search-form');
});


app.post('/search', (req, res) => {
    let searchTerm = req.body.keyboard;
    console.log(req.body.keyboard)
    client.search(searchTerm).then(function (response) {

      console.log(response.items)
      console.log("hellooo");
    }).catch(function (err) {
      console.log(err)
      res.send(err);
    });

});




app.listen(3000, () => {
  console.log('My first app listening on port 3000!!!!!')
});
