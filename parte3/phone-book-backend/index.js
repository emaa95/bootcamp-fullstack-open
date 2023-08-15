const express = require('express');
const app = express();
const port = 3001;

// Datos hardcodeados de la agenda telefónica
const agendaTelefonica = [
  { id: 1, nombre: 'Juan', telefono: '123456789' },
  { id: 2, nombre: 'María', telefono: '987654321' },
  { id: 3, nombre: 'Pedro', telefono: '555555555' }
];

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

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
