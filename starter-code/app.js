const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (request, response, next) => {
    response.render('index');
});

app.get('/random', (request, response, next) => {
    client.getRandomJoke().then((result) => {
        response.render('random', { result })
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/categories', (request, response, next) => {
    if (!request.query.cat) {
        client.getJokeCategories().then((result) =>  {
            response.render('categories',{ result });
        })
        .catch((err)=> {
            console.log(err);
        });
    } else {
        client.getRandomJoke(request.query.cat).then((result) =>  {
            response.render('random',{ result });
        })
        .catch((err)=> {
            console.log(err);
        });
    }
});

app.listen(3000, () => {
    console.log("Server started and listening on port 3000");
});