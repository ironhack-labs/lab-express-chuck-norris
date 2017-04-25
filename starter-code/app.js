const express = require('express');
const app = express();
const layouts      = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();
app.use(layouts);

app.set('view engine', 'ejs');

app.get("/",(res,req,next)=>{
req.render("index.ejs");
});

app.get("/random",(res,req,next)=>{

  client.getRandomJoke()

  .then((response) => {
    req.render("random.ejs",{
      random:response.value
    });
  }).catch((err) => {
  console.log("NO errors");
  });
});


app.get("/categories",(res,req,next)=>{
  console.log("cate");

  client.getJokeCategories()
  .then((response)=>  {

    if (res.query.cat) {
      client.getRandomJoke(res.query.cat)
        .then((ranjoke) => {
          console.log(ranjoke);
          req.render("categories.ejs",{
            cate:response,
            random: ranjoke.value,
            title: ranjoke.categories
          });
        });
    }else{
      req.render("categories.ejs",{
        cate:response,
        random:"",
        title:"Joke category"

      });
    }



  })
  .catch((err)=> {
console.log(err);
  });
});



app.get("/search",(res,req,next)=>{
  console.log("search");
req.render("search.ejs");
});

app.get('/search-data', (req, res, next) => {

    console.log(req.query);




      client.search(req.query.search)
    .then(function (response) {
      console.log("this is the VALUE",response.items);
        res.render('searchresult.ejs', {
        name: response.items
    });
  }).catch(function (err) {
console.log(err);
res.render('searchresult.ejs', {
name: []
});
  });
});




app.listen(3000);
