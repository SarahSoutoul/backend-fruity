// Importing Express 
require('dotenv').config()
const express = require('express');
const cors = require('cors');
// Create our server by calling express
const app = express()
// Above 1024
const port = process.env.PORT;
// process.env.PORT

const fruits = require('./fruits.json');

//express.json middleware
app.use(cors())
app.use(express.json())

// GET route
app.get('/', (req, res) => {
    res.send('Hello, Fruity!')
})

// Route to return all the fruits
app.get('/fruits', (req, res) => {
        // AUTHENTIFICATION 

    res.send(fruits)
})

// Route to return a specific fruit and its information
app.get('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase();

    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)

    if (fruit == undefined) {
        res.status(404).send("The fruit doesn't exist.")
    } else {
        res.send(fruit)
    }
})


// Add a new piece of fruit to the date
const ids = fruits.map(fruit => fruit.id);
let maxId = Math.max(...ids);

app.post('/fruits', (req, res) => {
    const fruitName = req.body
    // Check whether or not the fruit is found in the data
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == fruitName.name.toLowerCase())

    if (fruit != undefined) {
        // ERROR
        res.status(409).send("The fruit already exits.")
    } else {
        // Add fruit to the data - .push
        maxId += 1
        req.body.id = maxId

        fruits.push(fruitName)
        res.status(201).send(fruitName)
    }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
