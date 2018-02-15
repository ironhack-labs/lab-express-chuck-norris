const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/random', (req, res, next)=> {
  // Retrieve a random chuck joke
	client.getRandomJoke()
	.then((jokes) => {
			console.log("response is this: ",res);
			res.render('random', {
					// joke im using in the views
					// jokes is my response
					joke: jokes.value
			})
	// use the response here
	})
	.catch((err) => {
	// handle error
	throw err
	});    
});

app.get('/categories', (req, res, next)=> {
	client.getJokeCategories()
	.then((jokes) => {
			console.log("response is this: ",res);
			res.render('categories', {
					categories: jokes.value
			})
	// use the response here
	})
	.catch((err) => {
	// handle error
	throw err
	});    
});

app.get('/categories/:category', (req, res)=> {
	const category = req.params.category;
	client.getRandomJoke(category)
	.then((jokes) => {
			console.log("response is this: ",res);
			res.render('joke-by-category', {
					categoryJoke: jokes.value
			})
	})
	.catch((err) => {
	// handle error
	throw err
	});    
});











app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});