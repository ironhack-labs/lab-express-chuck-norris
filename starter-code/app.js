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
      console.log('Response Data:');
      console.log(response);
    }).catch((err) => {
      // handle error
      console.log('Error Data:');
      console.log(err);
    });

    var resVal = response.value;

    res.render("random.ejs");
});

// END ROUTES-----------------------

app.listen(3000);
