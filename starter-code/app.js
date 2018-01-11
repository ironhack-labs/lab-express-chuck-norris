const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/random', (req, res, next) => {
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    // use the response here
    console.log(response);
    res.render('index', response);
  }).catch((err) => {
    // handle error
  });
});

app.get('/categories', (req, res, next) => {
    if(req.query.cat) {
        client.getRandomJoke(req.query.cat)
        .then((response) => {
            console.log(response);
            res.render('joke-by-category', response);
        })
        .catch((err) => {
        });
    }
    else {
        client.getJokeCategories()
        .then((response)=>  {
            // use the response here
            //console.log(response);
            res.render('categories', {
                data: response
            });
        })
        .catch((err) => {
            // handle error
        });
    }
});

app.get('/search', (req, res, next) => {
    res.render('search-form.ejs', { items: [] });
});

app.post('/search', (req, res, next) => {
    //console.log(req.body.keyword);
    if(req.body.keyword) {
        client.search(req.body.keyword)
        .then(function (response) {
            //console.log(response);
            res.render('search-form.ejs', response);
        }).catch(function (err) {
        // handle error
        });
    }
    else {
        res.render('search-form.ejs', { items: [] });
    }
});


app.listen(3000, () => { 
  console.log('server started');
});