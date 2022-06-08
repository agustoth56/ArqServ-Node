const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PASSWORD_PATTERN = /^.{8,}$/;
const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const TEXT_PATTERN =/^[a-zA-Z]+$/;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: TEXT_PATTERN
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: EMAIL_PATTERN
    },
    password: {
        type: String,
        required: true,
        match: PASSWORD_PATTERN
    },
    validate: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id,
            delete ret._id,
            delete ret.__v
            delete ret.password
        }
    }
});

schema.pre('save', function(next) {
   if(this.isModified('password')) {
        bcrypt
            .genSalt(10)
            .then(salt => {
                bcrypt.hash(this.password, salt)
                    .then(hash => {
                        this.password = hash;
                        next();
                    })
                    .catch(err => next(err))
            })
            .catch(err => next(err))
   } else {
       next();
   }
});

schema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', schema);