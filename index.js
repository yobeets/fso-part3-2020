const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        name: "Mitchell Bartolo",
        number: "1234",
        id: 1
    },
    {
        name: "Jose Hosay",
        number: "456",
        id: 2
    },
    {
        name: "Papa Mehico",
        number: "420",
        id: 3
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})