const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
//indicamos el motor de vistas
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/random", function(req, res, next){
    //req.get("Traigan tributos!");
    client.getRandomJoke()
    .then((response) => {
        console.log("esto es lo que recibo de la llamada a la api")
        //var chiste = response;
        console.log(response)
        res.render("index", {chiste:response.value});
     }).catch((err) => {
    // handle error
    
     });
});
// Retrieve a random chuck joke
//final
app.listen(3000, function(err){
    if(err) console.log(err);
    console.log("Tu servidor está funcionando")
})

