const { User } = require('./../models/user');
const { success, fail } = require('./../util/response');

module.exports = {
    // List of users
    // @todo: paginate
    list (req, res) {
        User.find()
            .then((users) => {
                return success(res, users);
            }).catch((e) => {
                return fail(res, e);
            });
    },

    // View user details
    view (req, res) {
        User.findById(req.params.id)
            .then((user) => {
                if (!user) {
                    return fail(res, 'not_found', 404);
                }
                return success(res, user);
            }).catch((e) => {
                return fail(res, e);
            });
    },

    // Delete a user
    // @todo: send email
    remove (req, res) {
        User.findOneAndRemove({
            _id: req.body.id
        }).then(() => {
            return success(res);
        }).catch((e) => {
            return fail(res, e);
        });
    }
};
