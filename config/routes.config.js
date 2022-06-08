const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const pets = require('../controllers/pets.controller');


// Routes
router.get('/users', users.list);
router.post('/users', users.create);
router.get('/users/:id', users.detail);
router.patch('/users/:id', users.update);
router.delete('/users/:id', users.delete);

router.get('/pets', pets.list);
router.post('/pets', pets.create);
router.get('/pets/:id', pets.detail);
router.patch('/pets/:id', pets.update);
router.delete('/pets/:id', pets.delete);

module.exports = router