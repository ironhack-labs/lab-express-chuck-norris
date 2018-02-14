const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require ("body-parser");

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res, next){
    res.send('Description: Chuck Norris Jokes');
   
});

app.get('/random', function(req,res, next){
    // Retrieve a random chuck joke
    client.getRandomJoke()
    .then((response) => {
    // use the response here
    res.render('index', {joke:response});
    }).catch((err) => {
    // handle error
    });  
});

app.get('/categories', function(req,res, next){
    console.log(req.query.cat)
    if (req.query.cat){
        client.getRandomJoke(req.query.cat)
        .then((response)=>  {
            res.render("joke-by-category", {joke:response})
        })
        .catch((err)=> {
          res.send(err)
        });
    } else {
        client.getJokeCategories()
        .then((response)=>  {
            res.render('categories', {joke:response});
        })
        .catch((err)=> {
            // handle error
        });
    }
});

app.get("/search", function(req, res, next){
    res.render("search-form",{joke: ""})
    next()
});

app.post("/search", function(req, res, next){
    client.search(req.body.term)
  .then(function (response) {
    res.render("search-form",{joke:response.items})
  }).catch(function (err) {
    res.send(err)
  });
});


app.listen(3000, function(err){
    if(err) console.log(err);
    console.log('Mi servidor funciona')
    });

