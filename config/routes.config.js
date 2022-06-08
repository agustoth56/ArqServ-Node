const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const pets = require('../controllers/pets.controller');
const auth = require('../middlewares/auth.middleware')

// Routes
router.get('/users', auth.isAuthenticated, users.list);
router.post('/users', users.create);
router.get('/users/:id', auth.isAuthenticated, users.detail);
router.patch('/users/:id', auth.isAuthenticated, users.update);
router.delete('/users/:id', auth.isAuthenticated, users.delete);
router.get('/users/:id/activate', users.validate);

router.get('/pets', auth.isAuthenticated, pets.list);
router.post('/pets', auth.isAuthenticated, pets.create);
router.get('/pets/:id', auth.isAuthenticated, pets.detail);
router.patch('/pets/:id', auth.isAuthenticated, pets.update);
router.delete('/pets/:id', auth.isAuthenticated, pets.delete);

router.post('/login', users.login);

module.exports = router