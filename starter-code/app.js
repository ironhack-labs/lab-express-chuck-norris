const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const PORT = 3000

const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')

app.use(expressLayout)
app.set('layout', 'index')

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

let chuckNorrisCategories,
	randomJoke


app.get('/random', (req, res) => {
	client.getRandomJoke()
		.then(res => { randomJoke = res.value })
		.catch(err => {throw err})

		res.render('random-joke', {
			randomJokeText: randomJoke 
		})
})

app.get('/categories', (req, res) => {
	client.getJokeCategories().then(res => {
		chuckNorrisCategories = res
	}).catch(err => {throw err})

	res.render('categories', {
		categories: chuckNorrisCategories
	})
})

app.get('/', (req, res) => {
	res.send('Hello World!!')
})

app.listen(PORT, (req, res) => {
	console.log(`Express server run on http://localhost:${PORT}`);
})
