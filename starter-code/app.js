const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index");
  });

app.get('/random', (req, res, next) => {
    client
    .getRandomJoke()
    .then(response => {
        res.send(`<p> ${response.value} </p>`);
    })
    .catch(err => {
        console.log(err);
    });
})

app.get('/categories', (req, res, next) => {
    let cat;
    
    client
    .getJokeCategories()
    .then(response => {
        cat = response;        
    })
    .catch(err => {
        console.log(err);
    });
    res.render("categories", cat);
})


app.listen(3010, () => {
    // console.log('My first app listening on port 3000!')
  });

