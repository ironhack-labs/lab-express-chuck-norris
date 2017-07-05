const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      let obj = {
        "joke": response.value
      };
      res.render('index', obj);
    }).catch((err) => {
      console.log(`vaya error ${err}`);
    });

});

app.get("/categories", (res, req, next) => {
  console.log("Estoy En Categories");
  client.getJokeCategories()
    .then((response) => {

      if (res.query.cat) {
        client.getRandomJoke(res.query.cat)
          .then((ranjoke) => {
            console.log(ranjoke);
            req.render("categories.ejs", {
              categories: response,
              random: ranjoke.value,
              title: ranjoke.categories
            });
          });
      } else {
        req.render("categories.ejs", {
          categories: response,
          random: "",
          title: "Joke category"

        });
      }
    });
});

app.listen(3000, () => {
  console.log('Chuck Norris Al Aparato!');
});
