require('dotenv').config()
const express = require('express')
const app = express()
const Contact = require('./models/contact')
const cors = require('cors')
const morgan = require('morgan')

/* CONFIGURATION */

app.use(cors())
app.use(express.json());

morgan.token('postData', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    } else {
        return '';
    }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(express.static('dist'))

/* ROUTES */

// route ok
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  }).catch(e => {
    console.log(`Error:`, e)
  })
})


// route ok
app.post('/api/persons', ( request, response ) => {

  let errorMessages = [];

  const body = request.body

  const name = body.name
  const number = body.number

  // name validation

  /*
  if( !name ){
      errorMessages.push('name don´t be empty')
  }else{


      console.log(Contact)
      const duplicateName = Contact.filter( person => person.name === name )
      
      if( duplicateName.length > 0 ){
          errorMessages.push(`name ${name} exist in Phonebook`)
      } 

  }

  // number validation
  if( !number ){
      errorMessages.push('number don´t be empty')
  }
  
  if( errorMessages.length > 0 ){

      const errorMessage = errorMessages.map(error => `<p>${error}<p>`).join('<br>')
      response.send(errorMessage).status(403).end()

  }else{
    */
      const newContact = new Contact({
          name: name,
          number: number
      })

      newContact.save().then( contact => {
          response.json(contact)
      }).catch( e => {
          console.log(`Error:`, e)
      })
/*
  }
  */
})

app.get('/api/persons/:id', (request, response) => {
    
  const id = request.params.id

  Contact.findById(id).then( contact => {
      response.json(contact)
  }).catch( e => {    
      console.log(`Error:`, e)
  })

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




app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)

    persons = Contact.filter(person => person.id !== id)

    response.status(204).end()

})




/* SERVER */

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})