const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person');


app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    JSON.stringify(req.body), // Mostrar el cuerpo de la solicitud POST
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
}));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, req, res, next) =>{
  console.error(error.message)

  if (error.name === 'CastError'){
    return res.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError'){
    return res.status(400).json({error: error.message})
  }
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: ' unknown endpoint'})
}

app.use(cors())
app.use(express.json());
app.use(requestLogger)
app.use(express.static('build'))

// Ruta para obtener la lista de personas
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
  
});

//Ruta que muestra info de la fecha y la cantidad de personas de la agenda
app.get('/info', (req,res) => {
    const currentTime = new Date();
    Person.find({}).then(persons => {
      res.send(
        `
        <h2>Información de la solicitud</h2>
        <p>Hora de la solicitud: ${currentTime}</p>
        <p>Cantidad de entradas en la agenda: ${persons.length}</p>
        `
      )
    })

});

//Ruta que muestra la información de una persona específica 
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then( person => {
      if (person){
        res.json(person)
    } else
    {
        res.status(404).end()
    }
    })
    .catch(error => next(error))
});

// Ruta para eliminar una entrada de la agenda telefónica por su ID
app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
});

app.use(express.json());

// Ruta para agregar una nueva entrada a la agenda telefónica
app.post('/api/persons', (req, res, next) => {
  
  const body = req.body
  const personName = body.name
  const personNumber = body.number
  
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  
  const person = new Person({
    name: personName,
    number: personNumber
  })

  person.save()
  .then(savedPerson =>  savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    res.json(savedAndFormattedPerson)
  })
  .catch(error => next(error))
});

app.put('/api/persons/:id', (req, res, next ) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
  .then(updatePerson => {
    res.json(updatePerson)
  })
  .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
