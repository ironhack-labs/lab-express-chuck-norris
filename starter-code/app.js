const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


//configure app
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//routes
app.get('/random', (req, res, next) => {

    // Retrieve a random chuck joke
    client.getRandomJoke()
    .then((response) => {
        
        console.log(response.value);
        const data = {
            joke: response.value
        }
        res.render('random', data);


    }).catch((err) => {
    // handle error
    });

    
});


  
  //start app
app.listen(3000, () => {
    console.log('Easy web dev. 3000!')
  });