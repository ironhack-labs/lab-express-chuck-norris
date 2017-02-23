/*
Create Folder
touch app.js
npm init
mkdir public/images
mkdir views
npm install --save express
npm install --save ejs
npm install --save express-ejs-layouts
npm install --save body-parser //checks for form POSTS and does magic with the information
npm install --save spotify-web-api-node prettyjson //spotify web api
npm install --save inspect-process //handy for inspecting large objects (especially large ones)
mkdir views/layouts
touch views/layouts/main-layouts.ejs


Open App.js

const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express(); //creates 'instance' of Express
//MORE SPOTIFY
const SpotifyWebApi = require('spotify-web-api-node');
const spotify = new SpotifyWebApi();

spotify.searchTracks('thousand miles');

//SPOTIFY ABOVE
app.set('views', __dirname + '/views'); //point Express to EJS/HTML files in the Views folder
app.set('view engine', 'ejs'); //Express will use EJS package for files in Views
app.use(express.static('public')); //makes the Public folder public http://localhost:3000/images/1.png
app.use(expressLayouts); // for layout templates
app.use(bodyParser.urlencoded({ extended: true}));
app.set('layout', 'layouts/main-layout');

*/


const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const chuck = new Chuck();
app.set('views', __dirname + '/views'); //point Express to EJS/HTML files in the Views folder
app.set('view engine', 'ejs'); //Express will use EJS package for files in Views
app.set('layout', 'layout/main-layout');
app.use(express.static('public')); //makes the Public folder public http://localhost:3000/images/1.png
app.use(expressLayouts); // for layout templates

// chuck.getRandomJoke()
// .then((response) => {
//   const jokes = response.value;
//   console.log(joke);
// }).catch((err) => {
//   // handle error
// });



app.get('/', (req, res, next) => {
  res.render('index',{
  });
});

app.get('/random', (req, res, next) => {
  chuck.getRandomJoke()
  .then((response) => {
    const joke = response.value;
    res.render('random', {
      joke: joke
    });
  }).catch((err) => {
    // handle error
  });


});
app.get('/category', (req, res, next) => {
  chuck.getJokeCategories()
  .then((response)=>  {

    console.log(response);
    res.render('categories', {
      response: response
    });
  })
  .catch((err)=> {
    console.log("category broke");
    // handle error
  });
});
app.get('/category/explicit', (req, res, next) => {
  chuck.getRandomJoke('explicit')
  .then((response)=>  {

    console.log(response.value);
    let value = response.value;
    res.render('explicit', {
      value: value
    });
  })
  .catch((err)=> {
    console.log("category broke");
    // handle error
  });
});
app.get('/category/dev', (req, res, next) => {
  chuck.getRandomJoke('dev')
  .then((response)=>  {

    console.log(response.value);
    let value = response.value;
    res.render('explicit', {
      value: value
    });
  })
  .catch((err)=> {
    console.log("category broke");
    // handle error
  });
});
app.get('/category/movie', (req, res, next) => {
  chuck.getRandomJoke('movie')
  .then((response)=>  {

    console.log(response.value);
    let value = response.value;
    res.render('explicit', {
      value: value
    });
  })
  .catch((err)=> {
    console.log("category broke");
    // handle error
  });
});
app.get('/category/food', (req, res, next) => {
  chuck.getRandomJoke('food')
  .then((response)=>  {

    console.log(response.value);
    let value = response.value;
    res.render('explicit', {
      value: value
    });
  })
  .catch((err)=> {
    console.log("category broke");
    // handle error
  });
});
app.get('/category/science', (req, res, next) => {
  chuck.getRandomJoke('science')
  .then((response)=>  {

    console.log(response.value);
    let value = response.value;
    res.render('explicit', {
      value: value
    });
  })
  .catch((err)=> {
    console.log("category broke");
    // handle error
  });
});
app.get('/search', (req, res, next) => {

  let keyword = req.query.keyword;
  console.log(keyword);
  chuck.search(keyword)
  .then((response) =>  {

    let value = response.items[0].value;
    console.log(response.items[0].value);
    res.render('search', {
      value: value
    });
  })
  .catch((err)=> {
    console.log("err");
    res.send("category broke");
  });

});



app.listen(3000, () => {
  console.log("Chuck is running");
});
