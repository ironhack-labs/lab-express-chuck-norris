const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


//indicamos el motor de vistas
app.set("views",__dirname+"/views");
app.set("view engine","ejs");

app.get("/random",(req,res,next)=>{
        client.getRandomJoke()
        .then((response) => {
            console.log(response)
            res.render("index",{chiste:response.value});
        })
        .catch((err) => {
        console.log(err)        
    });
});

app.get("/categories",(req,res,next)=>{
    console.log(req)
    client.getJokeCategories()
    .then((response)=>  {
      res.render("categories",{response})
      // use the response here
    })
    .catch((err)=> {
        console.log(err)
      // handle error     
    });
});

// app.get("/",(req,res,next)=>{
//     client.getRandomJoke('dev')
//   .then((response) => {
//     // use the response here

//   }).catch((err) => {
//     // handle error
//   });
// });



//esto escucha las peticiones en el puerto 3000 y este bloque siempre debe ir al final
app.listen(3000,(err)=>{
    if(err)console.log(error);
    console.log("Tu servidor esta funcionando");
});