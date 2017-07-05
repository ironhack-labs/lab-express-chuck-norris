const express = require('express');
const Chuck  = require('chucknorris-io');
const expressLayouts = require('express-ejs-layouts');




const app = express();
const port = 3000;
const client = new Chuck();

app.use(express.static("public"));


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(expressLayouts);
app.set("layout", "layouts/default");


app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/random", (req, res, next) => {
  // Retrieve a random chuck joke
  var joke;
  client.getRandomJoke()
    .then((theJoke) => {
      //console.log(theJoke)
      // use the response here
      joke = theJoke.value;
      res.render("random", { joke }); // calling the document random.ejs
    }).catch((error) => {
      // handle error
      console.log('Something goes wrong');
      res.redirect('/');
    });

})

app.get("/categories", (req, res, next) => {

  var categories;
  client.getJokeCategories()
  .then((theCategory)=>  {
    // use the response here
    categories = theCategory;
    res.render("categories", { categories}); // calling the document categories.ejs
  })
  .catch((error)=> {
    // handle error
    console.log("Something wrong dude")
  });
})








app.listen(port, () => {
  console.log("I'm listening to the port " + port);
});
