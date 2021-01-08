const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Joi = require('@hapi/joi');

const requiredString = {
    type: String,
    required: true
}

const UserSchema = new Schema({
    firstName: {
        ...requiredString
    },
    lastName: {
        ...requiredString
    },
    email: {
        ...requiredString,
        unique: true
    },
    shippingAddress: {
        ...requiredString
    },
    password: {
        ...requiredString
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);