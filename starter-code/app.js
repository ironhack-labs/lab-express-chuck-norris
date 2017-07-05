const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('index dentro');
});

app.use(bodyParser.urlencoded({extended: true}));
app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then((response) => {
      console.log(response);
      res.send(response.value);
    }).catch((err) => {
      console.log(`Ha salido el error: ${err}`);
    });
});

app.get("/categories", (res, req, next) => {
  client.getJokeCategories()
    .then((response) => {
      console.log("Esto vale res =>");
      if (res.query.cat === true) {
        client.getRandomJoke(res.query.cat)
          .then((ranjoke) => {
            console.log(ranjoke);
            req.render("joke-by-category", {
              cat: response,
              randomJoke: ranjoke.value,
              title: ranjoke.categories
            });
            console.log("Res.Query vale esto: ");
            console.log(res.query);
          });
      } else {
        req.render("categories", {
          cat: response,
          title: "Joke category"
        }).catch((err) => {
          console.log(`Ha salido el error: ${err}`);
        });
      }
    });
});

app.get("/search", (req, res, next) => {
      res.render("search-form");
});

app.post("/search", (req, res, next) => {
  searchTerm = req.body.searchTerm;
  client.search(searchTerm)
    .then((response) => {
      console.log(response);
      res.render("joke-by-search", {
        jokeSearch: response.items
      });
      // res.render("joke-by-search", {joke: response});
    }).catch((err) => {


    });



});

app.listen(3000, () => {
  console.log('SERVER OK');
});
