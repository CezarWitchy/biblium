const DocumentRepository = require('../repositories/DocumentRepository');

const createDocument = async (data) => {
  const { title, isbn } = data;
  if (!title) throw new Error("Le titre est obligatoire");
  if (isbn && isbn.length < 5) throw new Error("ISBN invalide");
  return { message: "Document créé", document: await DocumentRepository.create(data) };
};

const getDocument = async (id) => {
  const doc = await DocumentRepository.findById(id);
  if (!doc) throw new Error("Document introuvable");
  return { message: "Document trouvé", document: doc};
};

const updateDocument = async (id, data) => {
  const exists = await DocumentRepository.findById(id);
  if (!exists) throw new Error("Document introuvable");
  return {message: "Document mis à jour", document: await DocumentRepository.update(id, data)};
};

const deleteDocument = async (id) => {
  const exists = await DocumentRepository.findById(id);
  if (!exists) throw new Error("Document introuvable");
  return await DocumentRepository.delete(id);
};

const listDocuments = async () => {
  return { message: "Liste des documents", data: await DocumentRepository.findAll() };
};

module.exports = { createDocument, listDocuments, getDocument, updateDocument, deleteDocument };