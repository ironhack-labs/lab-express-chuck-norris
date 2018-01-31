const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) =>{
    res.render('index');
});


app.get('/random', (req, res) => {
  client
    .getRandomJoke()
    .then(response => {
        let data = {
            value: response.value
        }
        res.render('index', data);
    })
    .catch(err => {
        console.log(err);
    });
})

app.get('/categories', (req, res) => {
    client
      .getJokeCategories()
      .then((response) => {
          let data = {
              value: response
          }
          res.render('index', data);
      })
      .catch(err => {
          console.log(err);
      })
})


app.listen(3001, () => {
    console.log('we made it');
})




// res.send(
//     `<p> res.value </p>` );

// let data = {
//     value = client.getRandomJoke()
// }