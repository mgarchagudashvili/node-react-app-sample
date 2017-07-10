const { User } = require('./../../src/models/user');

const cleanUpUsers = (done) => {
    User.remove({}).then(() => done());
};
module.exports = { cleanUpUsers };
