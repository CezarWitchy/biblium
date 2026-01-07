const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/DocumentController');
const auth = require('../middlewares/auth.middleware');

// Toutes ces routes sont protégées
// router.use('/documents', auth, documentRoutes);

router.use(auth);
router.post('/',auth, DocumentController.create);
router.get('/', DocumentController.list);
router.get('/:id', DocumentController.show);
router.put('/:id', DocumentController.update);
router.delete('/:id', DocumentController.remove);

module.exports = router;
