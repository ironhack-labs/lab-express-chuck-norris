const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(expressLayouts);
app.set('layout','layouts/main-layout');

app.set('views', __dirname + "/views");
app.set('view engine','ejs');

app.use(express.static('public'))

client.getJokeCategories()
  .then((response)=>  {
	// console.log(response);
	let data = {
		categories: response
	}
     // use the response here
		 app.get('/categories', (req, res) => {
		   res.render('categories',data);
		 });

		 app.get('/joke-by-category', (req, res) => {
		   res.render('joke-by-category',data);
		 });

  })
  .catch((err)=> {
    console.error(err);
  });


	// Retrieve a random chuck joke from the given category
	client.getRandomJoke('dev').then(function (response) {
		// console.log(response.value);
		let data = {
			joke: response.value
		}
	    // to stuff here
			app.get('/random', (req, res) => {
 		   res.render('random', data);
 		 });
	}).catch(function (err) {
	    // handle error
	});

const searchTerm = "kill";

client.search(searchTerm).then(function (response) {
	// console.log(response);
    // to stuff here
		app.get('/search', (req, res) => {
		 res.render('search');
	 });
}).catch(function (err) {
    // handle error
});

	// Server Started
	app.listen(3000, () => {
	  console.log('My first app listening on port 3000!')
	});
