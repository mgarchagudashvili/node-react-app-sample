const { User } = require('./../models/user');
const { fail } = require('./../util/response');

module.exports = (req, res, next) => {
    const token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            Promise.reject();
        }
        else {
            req.user = user;
            req.token = token;
            next();
        }
    }).catch(() => {
        return fail(res, 'unauthorized', 401);
    });
};
