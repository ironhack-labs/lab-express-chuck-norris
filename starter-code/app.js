const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/random",(req,res,next)=>{
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    // use the response here
    console.log(response.value)
    res.render("random",{response})
  }).catch((err) => {
    // handle error
  });


});

app.get("/categories",(req,res,next)=>{
  // Retrieve a random chuck joke
client.getJokeCategories()
  .then((response) => {
    // use the response here
    console.log(response)
    res.render("categories",{response})
    res.send()
  }).catch((err) => {
    // handle error
  });
});


app.get("/joke-by-category",(req,res,next)=>{
  // Retrieve a random chuck joke
  client.getRandomJoke('dev').then(function (response) {
      // do stuff here
      console.log(response)
      res.render("joke-by-category",{response})
  }).catch(function (err) {
      // handle error
  });
});
// app.get('/display-user-info', (req, res) => {
//   let name      = req.query.name;
//   let age       = req.query.age;
//   let superhero = req.query.superhero;
//
//   res.send(`
//     Your name is ${name}
//     Your age is ${age}
//     Your favorite superhero is ${superhero}
//   `)
// });

app.listen(3000,()=>{
  console.log("Hola mundo")
});
