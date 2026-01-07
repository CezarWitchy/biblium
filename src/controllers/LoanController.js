const LoanService = require('../services/LoanService');

const create = async (req, res) => {
  try {
    const result = await LoanService.createLoan(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const close = async (req, res) => {
  try {
    const result = await LoanService.returnLoan(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  };
};

const list = async (req, res) => {
  const result = await LoanService.listLoans();
  res.json(result);
};

module.exports = { create, close, list };
