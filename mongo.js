// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

// const url =
//   `mongodb+srv://fullstack:${password}@cluster0-hdtb8.mongodb.net/phonebook-app?retryWrites=true&w=majority`

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })



// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// })

// const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: name,
//   number: number,
// })

// if (process.argv.length === 3) {
//   console.log("Phonebook:")
//   Person.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person.name, person.number)
//     })
//     mongoose.connection.close()
//   })
// }
// if (process.argv.length === 5) {
//   person.save().then(result => {
//     console.log(`added ${person.name} to phonebook`)
//     mongoose.connection.close()
//   })
// }