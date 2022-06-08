const mongoose = require('mongoose');

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
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id,
            delete ret._id,
            delete ret.__v,
            delete ret.password
        }
    }
});

module.exports = mongoose.model('User', schema);