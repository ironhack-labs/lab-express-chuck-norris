const express = require('express');
const app = express();
app.use(express.static('public'));

// const Chuck  = require('chucknorris-io');
// const client = new Chuck();

// middleware - app.use OR app.get/post/etc

app.get('/', (req, res, next) => { 
    console.log(req.method, req.path);
    res.send(`<head> 
                    <title>The Chuck Norris Joke Department</title> 
                    <link rel="stylesheet" href="stylesheets/style.css"> 
              </head> 
              <body> 
                    <div class="container"> 
                        <h1>Hello Ironhack</h1> 
                        <p>It is almost lunch time. Honestly, it is!</p> 
                        <img src="images/messi.jpg" alt="jordis picture"> 
                    </div> 
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                    <script src="javascript/main.js"></script>
              </body>`);
});

app.listen(4000, () => console.log('Running'));