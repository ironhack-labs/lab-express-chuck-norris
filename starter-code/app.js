const express         = require('express');
const app             = express();
const bodyParser      = require('body-parser');
const expressLayouts  = require('express-ejs-layouts');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/main-layout');
app.set('view engine', 'ejs');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.get('/', (req, res, next) => { 
    res.render('index');
});

app.get('/random', (req, res, next) => {
     client.getRandomJoke().then((response) => {
     res.render('random', response );
}).catch((err) => {
     throw err;
  });
     
});


app.get('/categories', (req, res, next) => { 
    client.getJokeCategories().then((response)=>  {
        res.render('categories', { categories: response });
    })
    .catch((err)=> {
      throw err;
    });
    
});


app.get('/categories/:category', (req, res, next) => { 
    client.getRandomJoke(req.params).then((response) => {
        res.render('joke-by-category', response );
   }).catch((err) => {
        throw err;
   });
});

app.get('/search', (req, res, next) => { 
    res.render('search-form', { items : [{ value: null }]});
});

app.post('/search', (req, res, next) => {
    client.search(req.body.keyword)
    .then(function (response) {
      res.render('search-form', response)
    }).catch(function (err) {
      throw err;
    });
})




app.listen(4000, () => console.log('Running'));

