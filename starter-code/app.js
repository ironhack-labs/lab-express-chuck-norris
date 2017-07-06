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
app.get('/search-form',(request,response,next)=>{
   response.render("search-form");
 });

 app.post('/search', (req, res) => {
   client.search(req.body.inputkeyword)
   .then(function (response) {
     // to stuff here
     res.render('search',{response});
     console.log("body", request.body);
  }).catch(function (err) {
     // handle error
     console.log("error");
   });
 });



app.listen(3000, () => {

});
