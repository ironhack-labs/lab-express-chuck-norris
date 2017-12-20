const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', '/home/julien/codeLabss/Module2/lab-express-chuck-norris/starter-code' + '/views');
app.set ('view engine', 'ejs');
app.get('/random', (req,res,next) => {
    client.getRandomJoke()
        .then((res) => {
            let joke = getRandomJoke()
            res.render('random', joke) 
        })
        .catch((err) =>{
            res.render('random', 'not working')
        })
})
app.listen(3000)