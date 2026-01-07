const ReservationRepository = require('../repositories/ReservationRepository');
const ExemplaireRepository = require('../repositories/ExemplaireRepository');
const NotificationService = require('./NotificationService');

const createReservation = async ({ document_id }, user) => {
  if (!document_id){
    throw new Error("Document requis");
  };
  
  // 1️ vérifier doublon
  const existing = await ReservationRepository.findActive( user.id, document_id );
  if (existing) {
    throw new Error("Réservation déjà active");
  };

  // 2️ vérifier disponibilité
  const exemplaires = await ExemplaireRepository.findAll();
  const available = exemplaires.find( e => e.status === 'DISPONIBLE' && e.document_id === document_id );

  if (available) {
    throw new Error("Un exemplaire est disponible, réservation inutile"); 
  };

  // 3️ créer réservation
  const reservation = await ReservationRepository.create({user_id: user.id, document_id });
  return { message: "Réservation créée", reservation };
};

//  danje !!!
const satisfyReservationIfAny = async (exemplaire) => {
  const reservation = await ReservationRepository.findOldestActiveByDocument(exemplaire.document_id);
  
  if (!reservation) return null;
  await ReservationRepository.updateStatus(reservation.id, 'SATISFIED');
  await ExemplaireRepository.updateStatus(exemplaire.id, 'RESERVED');

  //  Ajoute notifikasyon an
  await NotificationService.notifyUser(
    reservation.user_id,
    `Votre réservation pour le document ID ${exemplaire.document_id} est prête à être récupérée.`
  );
  return reservation;

};

const listReservations = async () => {
  return { message: "Liste des réservations", data: await ReservationRepository.findAll() };
};

module.exports = { createReservation, listReservations , satisfyReservationIfAny };