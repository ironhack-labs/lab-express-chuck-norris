const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Chuck = require('chucknorris-io');
const client = new Chuck();

const Twig = require("twig");

app.use(bodyParser());
app.set("twig options", {
    strict_variables: false
});
app.set('view engine', 'twig');
app.set("view options", { layout: false });

app.get('/', (req, res, next) => {
    let links = { array: [{ name: "random" }, { name: "categories" }, { name: "search" }] };
    res.render('index.twig', links);
});

app.get('/random', (req, res, next) => {
    client.getRandomJoke().then(function (response) {
        res.send(`<p>${response.value}</p>`);
        console.log(response);
    }).catch(function (err) {
        console.log(err)
    });
});

app.get('/categories', (req, res, next) => {
    if (req.query.cat === "dev") {
        client.getRandomJoke("dev").then(function (response) {
            let obj = { response: { name: response.value, category: "Dev" } };
            res.render("joke-by-category.twig", obj);
            console.log(obj);
        }).catch(function (err) {
            console.log(err)
        });
    } else if (req.query.cat === "sport") {
        client.getRandomJoke("sport").then(function (response) {
            let obj = { response: { name: response.value, category: "Sport" } };
            res.render("joke-by-category.twig", obj);
        }).catch(function (err) {
            console.log(err)
        });
    } else {
        let links = { array: ["dev", "sport"] };
        res.render('categories.twig', links);
    }
});

app.get('/search', (req, res, next) => {
    let data = { jokes: [] };
    res.render('search-form.twig',data);
});

app.post('/search', (req, res) => {

    client.search(req.body.userInput)
        .then(function (response) {
            let data = { data: response};
            res.render('search-form.twig',data);
        }).catch(function (err) {
            console.log(`This error is: ${err}`);
        });
    });

app.listen(3000, () => {
    console.log('My first app listening on port 3000!')
});