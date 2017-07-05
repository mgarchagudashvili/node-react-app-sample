const validator = require('validator');

const isEmail = validator.isEmail;

module.exports = {
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        lowercase: true,
        validate: {
            validator: value => isEmail(value),
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    logIns: [{
        loginDate: {
            type: String,
            required: false
        }
    }]
};
