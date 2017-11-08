const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

// -- setup

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// -- routes



// our first Route:
app.get("/random", (req, res, next) => {
    // Retrieve a random chuck joke
    client.getRandomJoke()
        .then((joke) => {
            const data = {
                joke: joke
            };
            res.render("joke", data);
        }).catch((err) => {
        // handle error
        });
});



// categories
app.get("/categories", (req,res,next)=>{

client.getJokeCategories()
    .then((categories) =>{
     const data = {categories};
    res.render("categories",data);
}).catch((err) => {
    // handle error
    console.log(err);
    });
}

)

app.get("/categories", (req,res,next)=>{
    
    client.getJokeCategories()
        .then((categories) =>{
         const data = {categories};
        res.render("categories",data);
    }).catch((err) => {
        // handle error
        console.log(err);
        });
    }
    
    )


    app.get("/categories/:categoryId", (req, res, next) => {
        const data = req.params.categoryId;
        
        client
          .getRandomJoke(data)
          .then(response => {
            res.render("jokebycategory",{ response });
          })
          .catch(err => {
            console.log("Show error :" , err);
          });
        });
// -- 404

// -- start server

app.listen(3000, () => {
 console.log("My first app listening on port 3000!");
});
