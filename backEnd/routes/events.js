const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET - Listar todos os eventos
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Criar um novo evento
router.post('/', async (req, res) => {
  const { horaInicio, horaFim, titulo, descricao, participantes } = req.body;

  const novoEvento = new Event({
    horaInicio,
    horaFim,
    titulo,
    descricao,
    participantes
  });

  try {
    const eventoSalvo = await novoEvento.save();
    res.status(201).json(eventoSalvo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Evento deletado com sucesso." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
