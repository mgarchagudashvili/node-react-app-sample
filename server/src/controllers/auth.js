const _ = require('lodash');
const { User } = require('./../models/user');
const { success, fail } = require('./../util/response');
const { generatePassword } = require('./../util/helper');

module.exports = {
    // @todo: update to async await
    // @todo: use json schema validator
    async login (req, res) {
        try {
            const body = _.pick(req.body, ['email', 'password']);

            const user = await User.findByCredentials(body.email, body.password);

            if (!user) {
                return fail(res, 'wrong_credentials', 400);
            }

            const token = await user.generateAuthToken();
            user.addLogin();

            res.header('x-auth', token);
            return success(res);
        }
        catch (e) {
            return fail(res, e);
        }
    },

    // @todo: send email
    forgotPassword (req, res) {
        const body = _.pick(req.body, ['email']);

        User.findOne({ email: body.email })
            .then((user) => {
                if (user) {
                    const password = generatePassword();
                    return user.updatePassword(password);
                }
                return fail(res, 'not_found', 404);
            }).then(() => {
                return success(res);
            }).catch((e) => {
                return fail(res, e);
            });
    },

    // @todo: send email
    async create (req, res) {
        try {
            const body = _.pick(req.body, ['email', 'password']);

            // check if user by email exist
            const existingUser = await User.findOne({ email: body.email });

            if (existingUser) {
                return fail(res, 'duplicate_email', 400);
            }

            const user = new User(body);
            await user.save();
            const token = await user.generateAuthToken();

            res.header('x-auth', token);

            return success(res, user);
        }
        catch (e) {
            return fail(res, e);
        }
    }
};
