const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();

// app.use(expressLayouts);
// app.set("layout", "layouts/main-layout");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (request, response, next) => {});

app.get("/random", (req, res, next) => {
  client
    .getRandomJoke()
    .then(result => {
      //console.log(result);
      res.send(`<p>${result.value}</p>`);
    })
    .catch(err => {
      throw err;
    });
});

app.get("/categories", (req, res, next) => {
  client
    .getJokeCategories()
    .then(result => {
      var jokeCategories = [];
      res.render("joke-by-category", {
        jokeCategories: result
      });
      console.log(jokeCategories);
    })
    .catch(err => {
      throw err;
    });
});

for (i = 0; i < jokeCategories.length; i++) {
  app.get(`/categories/${jokeCategories[i]}`, (req, res, next) => {
    client
      .getRandomJoke(`${jokeCategories[i]}`)
      .then(result => {
        res.send(`<p>${result.value}</p>`);
      })
      .catch(err => {
        throw err;
      });
  });
}

app.get("/search", (request, response, next) => {});

app.listen(3000, () => {
  console.log("I'm ready");
});
