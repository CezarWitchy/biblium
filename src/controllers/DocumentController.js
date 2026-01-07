const DocumentService = require('../services/DocumentService');

const create = async (req, res) => {
  try {
    const result = await DocumentService.createDocument(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const list = async (req, res) => {
  try {
    const result = await DocumentService.listDocuments();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
};

const show = async (req, res) => {
  try {
    const result = await DocumentService.getDocument(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  };
};

const update = async (req, res) => {
  try {
    const result = await DocumentService.updateDocument(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const remove = async (req, res) => {
  try {
    const result = await DocumentService.deleteDocument(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  };
};

module.exports = { create, list, show, update, remove };