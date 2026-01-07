const DocumentRepository = require('../repositories/DocumentRepository');
const ExemplaireRepository = require('../repositories/ExemplaireRepository');
const ReservationRepository = require('../repositories/ReservationRepository');

const createExemplaire = async ({ document_id, code_barre }) => {
  if (!document_id || !code_barre) { throw new Error("Document et code-barre requis"); };

  const document = await DocumentRepository.findById(document_id);
  if (!document) { throw new Error("Document inexistant") };
  
  const exemplaire = await ExemplaireRepository.create({ document_id, code_barre });
  
  return { message: "Exemplaire créé", exemplaire };
};

// danger !!!
const satisfyReservationIfAny = async (exemplaire) => {
  const reservation = await ReservationRepository.findOldestActiveByDocument(exemplaire.document_id);
  if (!reservation) return null;

  await ReservationRepository.updateStatus(reservation.id, 'SATISFIED');
  await ExemplaireRepository.updateStatus(exemplaire.id, 'RESERVED');

  return reservation;
};

const listExemplaires = async () => {
  const data = await ExemplaireRepository.findAll();
  return { message: "Liste des exemplaires", data };
};

module.exports = { createExemplaire, listExemplaires , satisfyReservationIfAny};