const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, ReservationController.create);
router.get('/', auth, ReservationController.list);

module.exports = router;