const express = require("express");
const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
const Chuck = require("chucknorris-io");
const client = new Chuck();

app.get("/random", (req, res, next) => {
  let joke = {
    randomJoke: client
      .getRandomJoke()
      .then(response => {
        console.log(response.value);
      })
      .catch(err => {
        // handle error
      })
  };

  res.render("index", joke);
});

app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
