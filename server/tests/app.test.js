const expect = require('expect');
const request = require('supertest');

const { app } = require('./../app');
const { User } = require('./../src/models/user');
const { cleanUpUsers } = require('./util/dataHelper');

beforeEach(cleanUpUsers);

/**
 * @todo: test duplicate email, improve validation error test
 */
describe('POST /api/user', () => {
    it('should create a user', (done) => {
        const email = 'test@somemail.com';
        const password = 'verystrong';
        request(app)
            .post('/api/user')
            .send({ email, password })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body.data._id).toExist();
                expect(res.body.data.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    done(err);
                }
                User.findOne({ email }).then((user) => {
                    expect(user).toExist();
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should return error for invalid input', (done) => {
        request(app)
            .post('/api/user')
            .send({
                email: 'wrong_email',
                password: 123
            })
            .expect(400)
            .end(done);
    });
});

