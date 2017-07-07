const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const myChuck = new Chuck();
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const port = 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
// añado el sistema de layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);



// Aquí decimos que si queremos utilizar los layouts, tenemos que crear un directorio layout con un archivo main
app.set('layout', 'layouts/main')
// Aquí le decimos a express donde estarán todas las visatas
app.set('views', __dirname + '/views');

app.get('/', (req, res, next) => {
  const URLS = ['categories', 'random','joke-by-category', 'search'];  
  res.render('index', { URLS });
});


app.get('/search', (req,res,next)=>{
    res.render('search-form');
});


app.post('/search',(req, res, next)=>{
    let searchTerm = req.body.keyword;
    myChuck.search(searchTerm)
    .then((response)=>{
        let jokes=response.items;

        res.render('search-form', {jokes} );
    }).catch((err)=> {
        // handle error
        console.log(err)
    });
   
})

app.get('/categories/', (req, res, next) => {
    myChuck.getJokeCategories()
    .then((response)=>  {
        let categories = response;
        res.render('categories', {categories})
    })
    .catch((err)=> {
        // handle error
    });  

});

app.get('/joke-by-category/', (req, res, next) => {
  let category = req.query.cat;
  if(category){
    myChuck.getRandomJoke(category).then((response) => {
        let joke =response;
        console.log(joke)
        res.render('joke-by-category', {joke:joke});
    }).catch((err) => {
    // handle error
    });
  }else{
    const goToCategories = '<p>Go to select a <a href="/categories">category</a></p>';
    res.render('joke-by-category', {tag:goToCategories});

}
});



app.get('/random', (req, res, next) => {
    myChuck.getRandomJoke().then((response) => {
        let joke =response.value;
        console.log(joke)
        res.render('random', {joke});
  }).catch((err) => {
    // handle error
  });
});



app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})











