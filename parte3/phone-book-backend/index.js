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

app.use(express.json());
app.use(cors())
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
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = agendaTelefonica.find(person => person.id === id)

    if (person){
        res.json(person)
    } else
    {
        res.status(404).end()
    }
});

// Ruta para eliminar una entrada de la agenda telefónica por su ID
app.delete('/api/persons/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
  
    const entryToDelete = agendaTelefonica.find(entry => entry.id === idToDelete);
  
    if (!entryToDelete) {
      return res.status(404).json({ error: 'Entrada no encontrada' });
    }
  
    agendaTelefonica = agendaTelefonica.filter(entry => entry.id !== idToDelete);
  
    res.status(204).end();
});

function generateRandomId(){
    const minId = 1
    const maxId = 100000

    return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
}

app.use(express.json());

// Ruta para agregar una nueva entrada a la agenda telefónica
app.post('/api/persons', (req, res) => {
  
  const body = req.body
  const personName = body.name
  const personNumber = body.number

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
});



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
