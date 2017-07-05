/*
* @todo: define error codes
* */
module.exports = {
    success (res, data = {}, code = 200) {
        const response = {
            data,
            result: 'success'
        };
        res.status(code).send(response);
    },

    fail (res, error, code = 500) {
        const response = {
            error,
            result: 'failed'
        };
        res.status(code).send(response);
    }
};
