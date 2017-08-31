const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res, next) => {
  res.render("home");
});


app.get("/random", (req, res, next) => {
  client.getRandomJoke().then((jokeInfo) => {
    res.locals.randomJoke = jokeInfo.value;
    res.render("random-joke");
  });
});

app.get("/categories", (req, res, next) => {
  client.getJokeCategories()
    .then((response) => {
      // use the response here
      res.locals.categoryArray = response;
      res.render("categories");
    })
    .catch((err) => {
      // handle error
    });
});


app.get("/joke-by-category", (req, res, next) => {
  if (req.query.cat) {
    client.getRandomJoke(req.query.cat).then((jokeInfo) => {
      res.locals.actualJoke = jokeInfo.value;
      res.render("joke-by-category");

    })
  }
});

app.get("/search", (req, res, next) => {
  res.render("search-form");
})

app.post("/searching", (req, res, next) => {
  client.search(req.body.searchValue).then((response) => {
    console.log(response);
    res.locals.jokeArray = response.items;
    res.render("search-results");
  }).catch((err) => {
      console.log("error ", err);
  });

});



// :bulb: When your app requests the list of categories to the Chuck Norris API, the response will be an array. Prepare the data to show it in the view by sending as a view local with res.render().
//
// Each category should be a link. When a user clicks one of them, they should be sent to the category page. For example:
//
// If the user clicks on dev, they should be taken to http://localhost:3000/categories?cat=dev
// If the user clicks on sport, they should be taken to http://localhost:3000/categories?cat=sport
// Set the href of your anchor tags to match that.


app.listen(3000);
