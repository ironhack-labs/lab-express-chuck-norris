/* jshint esversion : 6*/

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(expressLayouts);
app.set('layout', 'index');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

let chuckNorrisCategories;
let chuckNorrisRamdon;

app.get('/ramdonjoke', (req,res)=>{
  client.getRandomJoke().then((res) => {
      chuckNorrisRamdon = res;
    })
    .catch((err) => {
      throw err;
    });
    res.render('ramdonjoke', {
      ramdonjoke: chuckNorrisRamdon
    });
});


app.get('/categories', (req,res) =>{
  client.getJokeCategories().then((res)=>  {
    chuckNorrisCategories = res;
  })
  .catch((err)=> {
    throw err;
  });

  res.render('categories', {
    categories: chuckNorrisCategories
  });
});


let port= 3000;
app.listen(port, () =>{
  console.log('conexion establecida');
});
