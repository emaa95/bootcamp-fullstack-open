const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://user:${password}@cluster0.ptlgxht.mongodb.net/?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');

    // Definir el esquema para una persona
    const personSchema = new mongoose.Schema({
      name: String,
      phone: String
    });

    // Crear el modelo basado en el esquema
    const Person = mongoose.model('Person', personSchema);
    const name = process.argv[3]
    const phone = process.argv[4]
    // Crear una instancia de Persona
    const newPerson = new Person({
      name,
      phone
    });

    // Guardar la persona en la base de datos
    newPerson.save()
      .then(savedPerson => {
        console.log('Persona guardada:', savedPerson);
      })
      .catch(error => {
        console.error('Error al guardar la persona:', error);
      })
      .finally(() => {
        // Cerrar la conexión a la base de datos
        mongoose.connection.close();
      });

    Person.find({}).then(persons => {
        console.log('Listados de personas', persons)
    }).finally(() => {
        mongoose.connection.close();
    })
  })
  .catch(err => {
    console.error('Error en la conexión a la base de datos:', err);
  });





