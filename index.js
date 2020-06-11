const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('data', function(req, res) {
	return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})


app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const content = `
            Phonebook has info for ${persons.length} people
            <br/><br/>
            ${new Date()}
        `
        res.send(content)
    })
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })


    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } 

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})