const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.set('layout','layout');


app.get('/random', (req, res) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      // use the response here
      let obj = {
        joke: response.value
      };

      res.render("index", obj);

    }).catch((err) => {
      console.log(`${err}`);
    // handle error
  });
});



app.get('/categories', (req, res) => {
  if(Object.keys(req.query).length === 0) {
    client.getJokeCategories()
      .then((response) => {
        let jokesCategories = {
          categories: response,
        };
          res.render('categories', jokesCategories);
      })
      .catch((err) => {
        // handle error
      });
  } else {
    let jokeReq = req.query;
    console.log(jokeReq);
    client.getRandomJoke(jokeReq)
      .then((response) => {
        let joke = {
          randomJoke: response.value
        };
        console.log(response);
        res.render('joke-by-category', joke);
      }).catch((err) => {
        console.log("Error in random jokes");
      });
  }
});


app.listen(3000, () => {

});
