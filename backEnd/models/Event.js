const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  horaInicio: { type: String, required: true },
  horaFim: { type: String, required: true },
  titulo: { type: String, required: true },
  descricao: { type: String },
  participantes: { type: [String], default: [] },
  dataEvento:{ type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
