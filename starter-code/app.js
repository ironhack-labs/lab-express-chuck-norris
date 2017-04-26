const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', (req, res, next) => {

 res.render("index");

});


app.get('/random',(req, res , next) =>{
  console.log("no entiendo nada!!!!!");

  client.getRandomJoke()
    .then((response) => {
      let randomJoke= response.value;
      res.send(`<p>${randomJoke}</p>`);
      // use the response here
    }).catch((err) => {
        console.log("Error, sacos de escombros");
      // handle error
    });


});
app.get('/categories', (req, res, next)=>{
  client.getJokeCategories()
    .then((response)=>  {
      console.log(response);
      res.render('categories', {cat: response});
      // use the response here
    })
    .catch((err)=> {
      console.log("Error, cara invierno")
    });
    if(req.query.cat){
      client.getRandomJoke(req.query.cat)
        .then((response) => {
          let randomJoke= response.value;
          res.send(`<p>${randomJoke}</p>`);
          // use the response here
        }).catch((err) => {
            console.log("Error, sacos de escombro");
          // handle error
        });
    }
});

app.get('/Home',(req, res, next)=> {
  res.render('Home',{result: undefined});
  console.log("patan");
});



app.get('/search',(req, res, next)=> {
  res.render('search-form',{result: undefined});
  console.log("-----------------------");
  console.log("patan");
  console.log("-----------------------");
});

app.post("/search", (req, res, next)=>{
  console.log("************************");
  console.log(req.body.category)
  console.log("************************* ");
     client.search(req.body.category)
     .then(function (response) {
       // to stuff here
       let result = response.items.map((elem) => elem.value);
       res.render("search-form", {result: result});
       console.log(result);
     }).catch(function (err) {
       // handle error
       console.log("Error, basura");




      });



});




app.listen(3000, () => {
  console.log('somos una panda de mataos')
});
