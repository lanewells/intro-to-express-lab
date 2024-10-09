const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

//1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    res.send({
        msg: `Howdy, ${req.params.username}!`
    })
})

//2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number)

    if (isNaN(number)) {
        res.send(`Please enter a number.`)
    } else {
        const randomNumber = Math.floor(Math.random() * (number + 1))
        res.send(`You rolled a ${randomNumber}!`)
    }
})

//3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ]


app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index

    if (isNaN(index)) {
        res.send(`Please enter a valid index number.`)
    } else if
    (index >= collectibles.length) {
        res.send(`This item is not in stock.`)
    } else {
        const item = collectibles[index]
        const name = item['name']
        const price = item['price']
        console.log(index, name, price)
        res.send(`You are looking for the ${name} at index ${index}. That will be $${price}!`)
    }
})

//4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes
    const minPrice = parseFloat(req.query.minPrice)
    if (!isNaN(minPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice)
    }
    const maxPrice = parseFloat(req.query.maxPrice)
    if (!isNaN(maxPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice)
    }
    const type = req.query.type
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type)
    }
    res.send(filteredShoes)
})