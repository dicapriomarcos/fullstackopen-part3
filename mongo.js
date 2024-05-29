const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

const password = process.argv[2]

const contactName =  process.argv[3]

const contactNumber =  process.argv[4]

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
    name: 'string',
    number: 'string',
  })

const Contact = mongoose.model('Contact', phonebookSchema)

if (process.argv.length === 3) {
    
    Contact.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(contact => {
            
          console.log(contact.name, contact.number)
          
        })
        mongoose.connection.close()
    }).catch(e => {
        console.log(`Error:`, e)
        mongoose.connection.close()
    })
}


if( process.argv.length === 5 ){
    const contact = new Contact({
        name: contactName,
        number: contactNumber,
    })


    contact.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
    })
}

