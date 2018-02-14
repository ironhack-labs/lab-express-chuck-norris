const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts     = require('express-ejs-layouts');
const bodyParser = require('body-parser');
// ...
app.use(bodyParser.urlencoded({ extended: true }));

// ...body parser for POST method data extraction
app.use(bodyParser.urlencoded({ extended: true }));

//set up views
app.set('views', __dirname + '/views');

//tell express that EJS in charge of rendering html
app.set('view engine', 'ejs');

//starting the application
app.listen(3000, () => {
    console.log('My first app listening on port 3000!')
  });

  app.get('/', (req, res, next) => {
    res.render('index');
  });


app.get('/random', (req, res, next) => {
    client.getRandomJoke().then((response) => {
      // use the response here
      console.log(response);
      res.render("random", response);
    }).catch((err) => {
      // handle error
    });
  });

  app.get('/categories', (req, res, next) => {
    client.getJokeCategories().then((response)=>  {
    // use the response here
        res.render("categories", {categories: response})
    })
    .catch((err)=> {
    // handle error
    });
  });

  app.get('/randomCategory', (req, res, next) => {
    let category = req.query.cat;
    client.getRandomJoke().then((response) => {
      // use the response here
      console.log(response);
      res.render("joke-by-category", response);
    }).catch((err) => {
      // handle error
    });
  });

  app.get('/search', (req, res) => {
    let data = req.query.searchWord;
    console.log(data);
    if (data !== undefined) {
      client.search(data).then((response) => {
        console.log(response);
        res.render('search', response)
      })
      .catch((err) => {
      })
    } else {
      res.render('search', {items:[]});
    }
  });

  
