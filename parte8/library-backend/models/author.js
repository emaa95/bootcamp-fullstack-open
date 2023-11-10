const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
  justOne: false, // Puedes cambiar esto a true si un autor tiene como máximo un libro
});

module.exports = mongoose.model('Author', schema)