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
    //console.log(response);
    res.render('index', response);


  }).catch ((err) => {
    // handle error
  });
});
app.get('/categories', (req, res, next)=>{
  if (req.query.cat) {
    // Retrieve a random chuck joke
    client.getRandomJoke(req.query.cat)
      .then((response) => {
        // use the response here
        res.render('joke-by-category', {'category': req.query.cat, 'value': response.value});
      }).catch((err) => {
        // handle error
      });
  }  else {
    client.getJokeCategories()
    .then((response)=>  {
      // use the response here
      //console.log(response);
      res.render('categories', {
        data: response
      });
    })
    .catch((err)=> {
    // handle error
    });

  }
});
app.get('/form', (req,res) => {
  res.render('search-form');
});

app.post('/search', (req,res,next) =>){
  let search = req.body.keyword;
  if(search){
    client.search(search){
      .then((response) => {
        res.render('jokes',{
          jokes: response,
          search: search
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }else{
    res.render('search-form');
  }
}

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('server started');
});
