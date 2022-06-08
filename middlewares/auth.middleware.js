const User = require('../models/user.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports.loadUser = (req, res, next) => {
    if(req.headers.authorization) { 
        const token = req.headers.authorization.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
            if(err) {
                next(createError(400, 'Bad Request'));
            } else {
                User.findById(data.sub)
                    .then(user => {
                        if (user) req.user = user;
                        next()
                    })
                    .catch(next)
            }
        })
    } else {
        next();
    }
}

module.exports.isAuthenticated = (req, res, next) => {
    (req.user) ? next() : next(createError(401, 'Unauthorized'))
}