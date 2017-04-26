const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();



app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random',(req,res,next)=>{

 client.getRandomJoke()
    .then((joke) => {
      res.send(joke.value);
    }).catch((err) => {
      res.send(err);
    });


});








app.listen(3002, () => {
  console.log('My first app listening on port 3002!')
});
