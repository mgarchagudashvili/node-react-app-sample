const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const userSchema = require('./schema/user');
const { JWT_SECRET } = require('./../../config');

const ACCESS_AUTH = 'auth';

// Define the user model
const UserSchema = new mongoose.Schema(userSchema);

// Limit the user data what is sent back after converting to JSON
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email', 'logIns']);
};

// Generate token for authentication and save
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = ACCESS_AUTH;
    const token = jwt.sign(
        { _id: user._id.toHexString(), access },
        JWT_SECRET
    ).toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return Promise.resolve(token);
    }).catch((e) => {
        return Promise.reject(e);
    });
};

// Remove token
UserSchema.methods.removeToken = function (token) {
    const user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    });
};

// Update user password
UserSchema.methods.updatePassword = function (password) {
    const user = this;

    user.password = password;

    return user.save();
};


// Update user password
UserSchema.methods.addLogin = function () {
    const user = this;
    const loginDate = Date.now();
    user.logIns.push({ loginDate });

    return user.save();
};

// Find a user by token
UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET);
    }
    catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': ACCESS_AUTH
    });
};

// Find a user by email and password
UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                }
                else {
                    reject();
                }
            });
        });
    });
};

// Hash password (if it was updated) before saving a user
UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});

// Create user model
const User = mongoose.model('User', UserSchema);

module.exports = { User };
