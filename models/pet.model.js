const mongoose = require('mongoose');

const TEXT_PATTERN =/^[a-zA-Z]+$/;

const schema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        match: TEXT_PATTERN,
    },
    age: {
        type: Number,
        required: true
    },
    familyName: {
        type: String,
        required: true,
        match: TEXT_PATTERN,
    },
    biography: {
        type: String,
        required: true,
        maxLength: 255
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id,
            delete ret._id,
            delete ret.__v
        }
    }
});

module.exports = mongoose.model('Pet', schema);