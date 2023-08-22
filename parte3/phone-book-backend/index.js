const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan')
const cors = require('cors')

// Datos hardcodeados de la agenda telefónica
let agendaTelefonica = [
  { id: 1, name: 'Juan', number: '123456789' },
  { id: 2, name: 'María', number: '987654321' },
  { id: 3, name: 'Pedro', number: '555555555' }
];

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
  res.json(agendaTelefonica);
});

app.get('/info', (req,res) => {
    const currentTime = new Date();
    const entryCount = agendaTelefonica.length

    const infoResponse = `
    <h2>Información de la solicitud</h2>
    <p>Hora de la solicitud: ${currentTime}</p>
    <p>Cantidad de entradas en la agenda: ${entryCount}</p>
    `;

    res.send(infoResponse);
});

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
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'El nombre y el teléfono son obligatorios' });
  }
  
  const existingEntry = agendaTelefonica.find(entry => entry.name === name);
  
  if (existingEntry) {
    return res.status(409).json({ error: 'El nombre ya existe en la agenda' });
  }

  const newEntry = {
    id: generateRandomId(),
    name,
    number
  };

  agendaTelefonica.push(newEntry);

  res.status(201).json(newEntry);
});




app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
