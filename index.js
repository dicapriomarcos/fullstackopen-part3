
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