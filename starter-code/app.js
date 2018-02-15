const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.use(express.static("public"));
app.set("views", __dirname+"/views");
app.set("view engine","ejs");

app.get('/',function(req,res,next){
    res.send("Chuck Norris Joke Department")
})

// randomo joke 
app.get("/random",function(req,res,next){
        // Retrieve a random chuck joke
client.getRandomJoke().then((response) => {
    console.log(response)
    res.render("index",{randomjode:response});
     }).catch((err) => {
     });

    // quando no quieres usar una vista sino que renderizs una view
    next();
});


app.get("/categories",function(req,res,next){
    client.getJokeCategories() 
    .then((response)=>  {
      console.log(response[0])
      res.render("categories",{response});
    }).catch((err)=> {
    // handle error
    });
    next();
});




app.get("/categories?cat=:categoryID",function(req,res,next){
// // Retrieve a random chuck joke
console.log(req.params.categoryID);
client.getRandomJoke(req.params.categoryID)
.then((response) => {
    res.render("joke-by-category",{jokebycategory:response});
}).catch((err) => {
    // handle error
});  
    next();
});




app.post("/search",function(req,res,next){
    console.log("8========D")
    client.search(searchTerm)
    .then(function (response) {
        res.render("search-form",{response})
    }).catch(function (err) {
      // handle error
    });
    next();
});






app.listen(3000, function(err){
    if (err) console.log(err);
    console.log("Tu servidor está funcionando en el puerto 3000");

});