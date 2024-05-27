
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const now = Date();
    if( persons.length === 0){
        response.send(`<p>The phonebook haven´t any data<p>
        <p>${now}</p>`);
    }else{
         response.send(`
        <p>The Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>`
         );        
    }

  })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    
    const id = Number(request.params.id)

    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }

})

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)

    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

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