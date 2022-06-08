const createError = require('http-errors');
const User = require('../models/user.model');
const mailer = require('../config/mailer.config');
const jwt = require('jsonwebtoken');

module.exports.list = (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next);
}

module.exports.create = (req, res, next) => {
    const body = {email, password} = req.body;
    User.create(body)
        .then(user => {
            mailer.sendValidationEmail(user)
            res.status(201).json(user)
        })
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

module.exports.login = (req, res, next) => {
    const {email, password} = req.body;

    User.findOne({email, validate: true})
        .then(user => {
            if (user) {
                user.checkPassword(password)
                    .then((match) => {
                        if(match) {
                            const token = jwt.sign({
                                sub: user.id,
                                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                            }, 
                            process.env.JWT_SECRET_KEY
                            )
                            res.json({accessToken: token})
                        } else {
                            next(createError(404, 'User and password do not match'))
                        }
                    })
                    .catch((err) => {
                        next(createError(404, 'Password checking problem'))
                    })
            } else {
                next(createError(404, 'User Not Found'))
            }
        })
        .catch((err) => {
            next(createError(404, 'User authentication problem'))
        })
}

module.exports.validate = (req, res, next) => {
    const body = {password} = req.body;
    User.findByIdAndUpdate(req.params.id, {validate: true}, {new: true})
        .then(user => user ? res.json(user) : next(createError(404, 'User Not Found')))
        .catch(next);
}