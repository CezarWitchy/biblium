const ReservationService = require('../services/ReservationService');

const create = async (req, res) => {
  try {
    const result = await ReservationService.createReservation( req.body, req.user );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const list = async (req, res) => {
  const result = await ReservationService.listReservations();
  res.json(result);
};

module.exports = { create,list };
