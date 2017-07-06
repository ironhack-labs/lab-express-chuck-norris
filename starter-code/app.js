const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

//layouts
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // initial
app.set('views', __dirname + '/views'); //engine de js
app.set('view engine', 'ejs'); // compilar ejs's


app.get('/random', (req, res, next) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      res.send(`<p>${JSON.stringify(response.value)}</p>`);
      console.log("AAAAAAAAAAAAAAAAAA");
    }).catch((err) => {
      res.send(`ERROR GETTING RANDOM JOKE`);
    });
});
app.get('/categories',(req, res, next)=> {
   client.getJokeCategories()
   .then((response)=>  {
    let categories = response;
    res.render('categories',categories);
  })
   .catch((err)=> {
     res.send(`ERROR GETTING CATEGORIES JOKE`);
   });
 });

// app.get('/categories', (req, res, next) => {
//   client.getJokeCategories()
//     .then((response) => {
//       // if a callback is specified, the rendered HTML string has to be sent explicitly
//       // res.render('categories', function(err, response) {
//       //   res.send(response);
//       let cat = response;
//       response.render('views/categories',{cat});
//       });
//     })
//     .catch((err) => {
//       res.send(`ERROR GETTING CATEGORIES`);
//     });
// });


app.get('/search', (req, res, next) => {
  let text = "Estoy en random";
  console.log(`${text}`);
  res.send(`req: ${text}`); // puedo meter lo que quiera, un index con trozos de html
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
