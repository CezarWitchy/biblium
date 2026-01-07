const LoanRepository = require('../repositories/LoanRepository');
const ExemplaireRepository = require('../repositories/ExemplaireRepository');
const FineService = require('./FineService');
const FineRepository = require('../repositories/FineRepository');
const ReservationService = require('./ReservationService');

const createLoan = async ({ user_id, exemplaire_id, date_retour_prevue }) => {
  if (!user_id || !exemplaire_id || !date_retour_prevue){
    throw new Error("Données manquantes"); 
  };

  const activeLoan = await LoanRepository.findActiveByExemplaire(exemplaire_id);
  if (activeLoan){
    throw new Error("Exemplaire déjà emprunté");
  };

  const loan = await LoanRepository.create({user_id, exemplaire_id, date_retour_prevue });

  await ExemplaireRepository.updateStatus(exemplaire_id, 'EMPRUNTE');

  return { message: "Prêt créé",loan };
};

// const returnLoan = async (loan_id) => {
//   const loan = await LoanRepository.closeLoan(loan_id);
//   if (!loan) { throw new Error("Prêt introuvable"); };
//   await ExemplaireRepository.updateStatus(loan.exemplaire_id, 'DISPONIBLE');
//   return { message: "Prêt clôturé",loan };
// };

// atention fn retoucher. a verifier si tout marche demain.
const returnLoan = async (loan_id) => {
  const loan = await LoanRepository.closeLoan(loan_id);// suspect.
  if (!loan) throw new Error("Prêt introuvable");
  
  await LoanRepository.closeLoan(loan_id);// suspect.
  await ExemplaireRepository.updateStatus( loan.exemplaire_id, 'DISPONIBLE');
  await ReservationService.satisfyReservationIfAny(exemplaire);// suspect.

  const fineData = FineService.calculateFine( new Date(loan.date_retour_prevue), new Date());

  let fine = null;
  if (fineData) {
    fine = await FineRepository.create({ loan_id, amount: fineData.amount, days_late: fineData.daysLate });
  };

  return { message: "Prêt retourné", loan, fine };  
};

// const returnLoan = async (loanId) => {
//   const loan = await LoanRepository.findById(loanId);

//   await LoanRepository.closeLoan(loanId);

//   const exemplaire = await ExemplaireRepository.updateStatus( loan.exemplaire_id, 'DISPONIBLE' );

//   await ReservationService.satisfyReservationIfAny(exemplaire);

//   return { message: 'Retour effectué' };
// };

const listLoans = async () => {
  return { message: "Liste des prêts",data: await LoanRepository.findAll() };
}; 

module.exports = { createLoan, returnLoan,listLoans };