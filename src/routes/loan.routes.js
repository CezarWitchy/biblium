const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/LoanController');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, LoanController.create);
router.get('/', auth, LoanController.list);
router.put('/:id/return', auth, LoanController.close);

module.exports = router;
