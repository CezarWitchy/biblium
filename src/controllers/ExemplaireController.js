const ExemplaireService = require('../services/ExemplaireService');

const create = async (req, res) => {
  try {
    const result = await ExemplaireService.createExemplaire(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const list = async (req, res) => {
  const result = await ExemplaireService.listExemplaires();
  res.json(result);
};

module.exports = { create, list };
