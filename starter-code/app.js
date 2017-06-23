const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();



app.set("views", "views");

app.set("view engine", "ejs");







app.get("/random", (req, res, next) => {
  client.getRandomJoke()

    .then((response) => {
      const joke = response.value;
      res.render("random.ejs", {
        randomJoke: joke
      });
    })
    .catch((err) => {

    });
});


app.get("/categories", (req, res, next) => {

  client.getJokeCategories()
    .then((response) => {
      const catArray = response;
      res.render("categories.ejs", {
        chuckCat: catArray
      });
      // use the response here
    })
    .catch((err) => {
      // handle error
    });


});

app.get('/jokeCategory', (req, res, next) => {
  const clickedLink = req.query.cat;
  client.getRandomJoke(clickedLink).then((jokeInfo) => {
    res.render('joke-by-category.ejs', {
      theJoke: jokeInfo.value,
      clickedLink: req.query.cat
    });
  });
});



app.listen(3000);
