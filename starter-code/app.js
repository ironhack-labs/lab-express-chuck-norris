const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');


app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout','layouts/main-layout');
app.set('views',__dirname + '/views');
app.set('view engine','ejs');




//app.js
app.get('/', (req, res, next) => {
	res.render('index');

})

//Random
app.get('/random', (req, res, next) => {

	// Retrieve a random chuck joke
	client.getRandomJoke()
	  .then((response) => { 
	  	console.log(response);
	  	let joke=response.value;


	  	res.render('random',{ 
	  		joke});
	    // use the response here
	    
	  }).catch((err) => {
	    // handle error
	  });
		
});


// //Categories
// app.get('/categories', (req, res, next) => {
// res.render('index',{});

// });
// //Search
// app.get('/search', (req, res, next) => {
// res.render('index',{});

// });



app.listen(3000);