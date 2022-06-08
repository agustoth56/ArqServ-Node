const createError = require('http-errors');
const Pet = require('../models/pet.model');

module.exports.list = (req, res, next) => {
    Pet.find()
        .then(pets => res.json(pets))
        .catch(next);
}

module.exports.create = (req, res, next) => {
    const body = {type, name, age, familyName, biography} = req.body;
    Pet.create(body)
        .then(pet => res.status(201).json(pet))
        .catch(next);
}

module.exports.detail = (req, res, next) => {
    Pet.findById(req.params.id)
        .then(pet => pet ? res.json(pet) : next(createError(404, 'Pet Not Found')))
        .catch(next);
}

module.exports.update = (req, res, next) => {
    const body =  {age, familyName, biography}  = req.body;
    Pet.findByIdAndUpdate(req.params.id, body, {new: true})
        .then(pet => pet ? res.json(pet) : next(createError(404, 'Pet Not Found')))
        .catch(next);
}

module.exports.delete = (req, res, next) => {
    Pet.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch(next);
}