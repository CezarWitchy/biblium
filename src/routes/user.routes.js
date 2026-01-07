const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const AuthController = require('../controllers/authController');
// const UserController = require('../controllers/userController');

// router.get('/', UserController.getAllUsers);
// router.get('/', auth, UserController.getAllUsers);

// router.post('/', UserController.createUser);
// router.post('/', auth, UserController.createUser);


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;