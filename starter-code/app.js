const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("views",__dirname+"/views");
app.set("view engine", "ejs");

// app.get("/",(req,res,next)=> {
//     res.render("index");
// })

app.get("/random",(req,res,next)=> {
    client.getRandomJoke()
        .then((response) => {
            const joke=response.value;
            //console.log(joke);
            res.render("index", {joke});
        }).catch((err) => {
            console.log("error:"+err)
        });
  
})

app.get("/categories",(req,res,next)=> {
   
    if(req.query.cat !== undefined) {
        const cat=req.query.cat;
        client.getRandomJoke(req.query.cat)
        .then((response) => {
            const joke=response.value;
            res.render("joke-by-category", {joke,cat});
        }).catch((err) => {
            console.log("error:"+err)
        });

    }else {
        client.getJokeCategories()
        .then((categories) => {
            res.render("categories", {categories});
        }).catch((err) => {
            console.log("error:"+err)
        });
    }
  
})



app.listen(3000, ()=> {
    console.log("listening to port 5000");
});
