const express = require('express')
const morgan = require('morgan')

morgan.token('data', function(req, res) {
	return JSON.stringify(req.body)
})

const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

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

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const peopleCount = persons.length
    const timeStamp = new Date()
    //console.log(peopleCount)
    res.send(`<p>Phonebook has info for number ${peopleCount} people</p><p>${timeStamp}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const randomId = Math.floor(Math.random() * 6000) + 1  
    return randomId
    }

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'person already listed in phonebook'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})