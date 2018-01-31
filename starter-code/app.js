const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  console.log(req);
  res.send("<p>Welcome Ironhacker. :)</p>");
});

app.get("/random", (req, res, next) => {
  // Retrieve a random chuck joke
  client
    .getRandomJoke()
    .then(result => {
      // use the response here
      console.log("SUCCESS");
      console.log(result);
      res.send(`<p>${result.value}</p>`);
    })
    .catch(err => {
      throw err;
      // handle error
    });
});

app.get("/categories", (req, res, next) => {
  // Retrieve a random chuck joke
  client
    .getJokeCategories()
    .then(result => {
      res.render("categories", { cat: result });
      console.log(result);
      // use the response here
    })
    .catch(err => {
      throw err;
      // handle error
    });
});

app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
