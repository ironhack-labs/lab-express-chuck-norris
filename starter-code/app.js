const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use( express.static( 'public' ) );

// ROUTES --------------------------
app.get("/random", (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      // use the response here
      console.log('Response Data2:');
      console.log(res);
      res.locals.resVal = response.value;
      res.render("random.ejs");

    }).catch((err) => {
      // handle error
      console.log('Error Data3:');
      console.log(err);

    });
});

app.get("/categories", (req, res, next) => {
  client.getJokeCategories()
    .then((response)=>  {
      // use the response here
      console.log('Response Data:');
      console.log(response);
      res.locals.categoryVal = response;
      res.render('categories.ejs');
    })
    .catch((err)=> {
      // handle error
    });

});

// END ROUTES-----------------------

app.listen(3000);
