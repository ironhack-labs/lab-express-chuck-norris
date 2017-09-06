const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const PORT = 3000

const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')

app.use(expressLayout)
app.set('layout', 'index')

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('public'))

app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then(res => {
			res.render('random-joke', {
		    randomJokeText: res.value
		  })
    })
    .catch(err => {
      throw err
    })
})

app.get('/categories', (req, res) => {
  client.getJokeCategories().then(res => {
		res.render('categories', {
	    categories: res
	  })
  }).catch(err => {
    throw err
  })
})


app.get("/category", (req, res) => {
  client.getRandomJoke(req.query.cat).then(res => {
		res.render("category", {
	    cat: res
	  })
  }).catch(err => {
    throw err
  })
})


app.get('/', (req, res) => {
})

app.listen(PORT, (req, res) => {
  console.log(`Express server run on http://localhost:${PORT}`);
})
