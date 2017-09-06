const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');


app.get('/random', (req, res, next) => {
	client.getRandomJoke()
	.then((response) => {
		res.send(`<p>${response.value}</p>`);
	}).catch((err) => {
	  console.log(error);
	});;
	
});

app.get('/categories', (req, res, next) => {
	client.getJokeCategories()
	.then((response) => {
		res.render('categories', {categories: response});
	}).catch((err) => {
	  console.log(error);
	});;
	
	// app.get('/categories/:catid', (req, res, next) => {
	// 	client.getRandomJoke(request.params.catid)
	// 	.then((response) => {
	// 		res.send(`<p>${response.value}</p>`);
	// 	}).catch((err) => {
	// 		console.log(error);
	// 	});;
});
 
app.listen(3000, () => console.log('Chuck'));

