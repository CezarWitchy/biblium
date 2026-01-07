const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes'); 
const authRoutes = require('./auth.routes');
const exemplaireRoutes = require('./exemplaire.routes');
const loanRoutes = require('./loan.routes');
const reservationRoutes = require('./reservation.routes');
const notificationRoutes = require('./notification.routes');

router.use('/users', userRoutes);
router.use('/auth',  authRoutes);
router.use('/documents', require('./document.routes'));
router.use('/exemplaires', exemplaireRoutes);
router.use('/loans', loanRoutes);
router.use('/reservations', reservationRoutes);
router.use('/notifications', notificationRoutes);

router.get('/', (req, res) => {
  res.json({name: 'Bibilium',status: 'API en ligne '});
});
 
module.exports = router;

