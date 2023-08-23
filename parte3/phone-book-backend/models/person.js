require('dotenv').config();
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');

    
  })
  .catch(err => {
    console.error('Error en la conexión a la base de datos:', err);
  });

  // Definir el esquema para una persona
  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true,
      unique: true
    } ,
    phone: {
      type: String,
      minlength: 8,
      required: true
    }
  });

  personSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
  })
  
  module.exports = mongoose.model('Person', personSchema)

