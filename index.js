
const express = require('express')
const mongoose = require('mongoose');
const app = express()

const url = process.env.MONGODB_URI

mongoose.connect(url)
.then(result => {
  console.log('connected to MongoDB')
})
.catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

const contactSchema = new mongoose.Schema({
  name: 'string',
  number: 'string',
})

const Contact = mongoose.model('Contact', contactSchema)

const cors = require('cors')

app.use(cors())

app.use(express.json());

const morgan = require('morgan')

morgan.token('postData', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    } else {
        return '';
    }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  }).catch(e => {
    console.log(`Error:`, e)
  })
})




app.post('/api/persons', ( request, response ) => {

    let errorMessages = [];

    const body = request.body

    const name = body.name

    // name validation
    if( !name ){
        errorMessages.push('name don´t be empty')
    }else{

        const duplicateName = persons.filter( person => person.name === name )
        
        if( duplicateName.length > 0 ){
            errorMessages.push(`name ${name} exist in Phonebook`)
        } 

    }

    const number = body.number

    // number validation
    if( !number ){
        errorMessages.push('number don´t be empty')
    }
    
    if( errorMessages.length > 0 ){

        const errorMessage = errorMessages.map(error => `<p>${error}<p>`).join('<br>')
        response.send(errorMessage).status(403).end()

    }else{

        const personObj = {
            id: Math.floor(Math.random() * 9999),
            name: name,
            number: number

        }

        persons = [...persons, personObj]

        response.send(`New contact ${name} with number ${number} was added to Phonebook`).status(200).end()
    }
    
    

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})