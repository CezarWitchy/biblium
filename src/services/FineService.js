const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DAILY_FINE = 4; // 4 unite /jr de reta.

// pou m jwenn penalite yo.
const calculateFine = (dueDate, returnDate) => {
  const diff = returnDate - dueDate;
  const daysLate = Math.ceil(diff / MS_PER_DAY);

  if (daysLate <= 0) { return null };

  return { daysLate, amount: daysLate * DAILY_FINE };
};

module.exports = { calculateFine };
