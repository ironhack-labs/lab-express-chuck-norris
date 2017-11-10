"use strict";

const express = require('express');
const app = express();


const Chuck  = require('chucknorris-io');
const client = new Chuck();

const layouts = require("express-ejs-layouts");
// ---------- Setup ----------


//app.set("views", "views");
app.set("view engine", "ejs" );

app.use(express.static("public"));

// ------------------
//app.set("views", "views");
app.set("view engine", "ejs" );

app.use(express.static("public"));

//Tell Express we want to use "Express-ejs-layouts" package
// Helps us keep our HTML DRY
app.use(layouts);

// Tell Express that our layout file is called "master-template.ejs"
app.set("layout", "master-template.ejs");
// ------------------

// ---------- End Setup -------

// Globals ------ 



// Routes ------------
app.get("/", (req, res, next)=> { 
	res.render("index.ejs");
});


app.get("/categories", (req, res, next)=> { 
	client.getJokeCategories()

	.then((response) => {
		console.log("Joke Data:");
		console.log(response);


		
		res.locals.getCategories = response;
		res.render("categories.ejs"); // displays content
	})
	.catch((err) => {
		console.log("Joke Error:");
		console.log(err);
	});
});



app.get("/random", (req, res, next)=> { 
	client.getRandomJoke()

	.then((response) => {
		console.log("Joke Data:");
		console.log(response);

		res.locals.jokeResponse = response.value;
		res.render("random-joke.ejs");
	})
	.catch((err) => {
		console.log("Joke Error:");
		console.log(err);
	});
});


app.get("/yourcategory", (req, res, next)=> { 
	client.getRandomJoke()

	.then((response) => {
		console.log("Joke Data:");
		console.log(response);
		console.log("=======> " + req.query.CurrentCat);

		res.locals.jokeInCat = response.value;
		res.render("your-category.ejs");
	})
	.catch((err) => {
		console.log("Joke Error:");
		console.log(err);
	});
//res.locals.searchTerm = req.query;

// 	client.search(searchTerm)
//   .then(function (response) {
//     console.log("=======> " + req.query);

//     res.render("your-category.ejs");
//   }).catch(function (err) {
//     // handle error
//   });

});




// ---------- End Routes -------



app.listen(3000);