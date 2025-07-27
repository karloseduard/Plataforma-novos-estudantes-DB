const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET - Listar todos os eventos ou por query ?participante=Turmas de TI
router.get('/', async (req, res) => {
  try {
    const { participante } = req.query;

    let filtro = {};
    if (participante) {
      filtro.participantes = participante;
      // Ou use $in para múltiplos participantes
      // filtro.participantes = { $in: participante.split(',') };
    }

    const events = await Event.find(filtro);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// NOVA ROTA - Filtro por participante via URL (ex: /api/events/filtro/Turmas%20de%20TI)
router.get('/filtro/:participante', async (req, res) => {
  try {
    const participante = req.params.participante;

    const events = await Event.find({
      participantes: participante
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Criar um novo evento
router.post('/', async (req, res) => {
  const { horaInicio, horaFim, titulo, descricao, participantes, local, dataEvento } = req.body;

  const novoEvento = new Event({
    horaInicio,
    horaFim,
    titulo,
    descricao,
    participantes,
    local,
    dataEvento
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


