const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io'),
      client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

//layouts
app.use(express.static('public'));
app.use(expressLayouts);
//app.set('layout', 'layouts/main'); // initial
app.set('views', __dirname + '/views'); //engine de js
app.set('view engine', 'ejs'); // compilar ejs's


app.get('/random',(req,res,next)=>{

  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    res.send(`${JSON.stringify(response)}`);
    console.log("AAAAAAAAAAAAAAAAAA");
  }).catch((err) => {
    res.send(`NO ENCUENTRA CHISTE`);
    });
});

// Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    // use the response here
  }).catch((err) => {
    // handle error
  });


app.get('/categories',(req,res,next)=>{
  let text = "Estoy en random";
  console.log(`${text}`);
  res.send(`req: ${text}`); // puedo meter lo que quiera, un index con trozos de html
});

app.get('/search',(req,res,next)=>{
  let text = "Estoy en random";
  console.log(`${text}`);
  res.send(`req: ${text}`); // puedo meter lo que quiera, un index con trozos de html
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
