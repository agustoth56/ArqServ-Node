const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next);
}

module.exports.create = (req, res, next) => {
    const body = {email, password} = req.body;
    User.create(body)
        .then(user => res.status(201).json(user))
        .catch(next);
}

module.exports.detail = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user ? res.json(user) : next(createError(404, 'User Not Found')))
        .catch(next);
}

module.exports.update = (req, res, next) => {
    const body = {password} = req.body;
    User.findByIdAndUpdate(req.params.id, body, {new: true})
        .then(user => user ? res.json(user) : next(createError(404, 'User Not Found')))
        .catch(next);
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch(next);
}