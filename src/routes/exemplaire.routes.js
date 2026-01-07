const express = require('express');
const router = express.Router();
const ExemplaireController = require('../controllers/ExemplaireController');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, ExemplaireController.create);
router.get('/', auth, ExemplaireController.list);

module.exports = router;