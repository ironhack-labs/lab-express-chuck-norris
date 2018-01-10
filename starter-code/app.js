const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/random', (req, res, next)=>{
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

app.listen(3000, () =>{
  console.log('server started');
});