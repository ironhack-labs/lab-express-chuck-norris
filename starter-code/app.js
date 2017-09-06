const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');


app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/main-layout');
app.set('view engine', 'ejs');

app.get('/', (req,res,next) => {
  res.render('index',{greeting: "HI!!!"});
});

app.get('/categories', (req,res,next) => {
  client.getJokeCategories()
  .then((response) =>  {
    res.render('categories', {categoryType: response});
  })
  .catch((err)=> {
    // handle error
  });
});

app.get('/categories', (req,res,next) => {
  client.getJokeCategories()
  .then((response) =>  {
    res.render('categories', {categoryType: response});
  })
  .catch((err)=> {
    // handle error
  });
});

app.get('/random', (req,res,next) => {
  console.log(req.method, req.path);

  client.getRandomJoke()
  .then((response) => {
    res.send('<p>'+ response.value + '</p>');
  }).catch((err) => {
    res.send(error);
  });
});

app.get('/hello', (req, res, next) => {
  console.log("Ok");
  res.send(`
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/stylesheet/style.css">
      </head>
      <body>
        Yo Becht!
      </body>
    </html>
  `);
});

app.listen(4000, () => console.log('Heard it Bech!!'));
