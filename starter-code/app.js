const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);
app.set("layout", "layout/main-layout");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// intialise random route
app.get("/random", (req, res, next) => {
  client
    .getRandomJoke()
    .then(response => {
      console.log("DEBUG response", response);
      res.render("random", { response: response.value });
    })
    .catch(err => {
      // handle error
      console.log("DEBUG err", err);
      // res.render("random", { err: "erreur de communication" });
    });
});

// intialise categories route
app.get("/categories", (req, res, next) => {
  client
    .getJokeCategories()
    .then(response => {
      console.log("DEBUG response", response);
      res.render("categories", { response: response });
    })
    .catch(err => {
      // handle error
      console.log("DEBUG err", err);
      // res.render("random", { err: "erreur de communication" });
    });
});

// server started
app.listen(3000, () => {
  console.log("We are loggued!");
});
