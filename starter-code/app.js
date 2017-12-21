const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

//console.log(client.getRandomJoke());

app.get("/random", (request, response, next) => {
    // Retrieve a random chuck joke
    client.getRandomJoke()
    .then((res) => {
        let joke = res;
        console.log(joke);
        response.render('random', {joke});
    }).catch((err) => {
        // handle error
        console.log(err);
        response.send("It's an error");
    });
    
});

app.get("/categories", (request, response, next) => {
    // Retrieve a random chuck joke
    client.getJokeCategories()
    .then((res) => {
        let category = res;
        console.log(category);
        response.render('categories', {category});
    }).catch((err) => {
        // handle error
        console.log(err);
        response.send("It's an error");
    });
  
    
});

// app.post("/search/:name", (request, response, next) => {
//     // Retrieve a random chuck joke
//     console.log(request.params.name);
//     response.send('ok')
//     // .then((res) => {
//     //     let category = res;
//     //     console.log(category);
//     //     response.render('search');
//     // }).catch((err) => {
//     //     // handle error
//     //     console.log(err);
//     //     response.send("It's an error");
//     // });  
// });    

// app.get("/search", (request, response, next) => {
//     // Retrieve a random chuck joke
//     response.render('search-form');
//     // console.log(request.body);
//     // client.getRandomJoke()
//     // .then((res) => {
//     //     let category = res;
//     //     console.log(category);
//     //     response.render('search');
//     // }).catch((err) => {
//     //     // handle error
//     //     console.log(err);
//     //     response.send("It's an error");
//     // });  
// }); 

app.listen(3000, () => {
    console.log("I'm working!");
});
