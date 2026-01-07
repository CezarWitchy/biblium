const express = require('express');
const router = express.Router();
const NotificationService = require('../services/NotificationService');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, async (req, res) => {
  const notes = await NotificationService.getUserNotifications(req.user.id);
  res.json({ message: "Vos notifications", data: notes });
});

module.exports = router;
