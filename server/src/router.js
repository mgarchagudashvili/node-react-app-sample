const auth = require('./middleware/auth');
const authController = require('./controllers/auth');
const userController = require('./controllers/user');

module.exports = (app) => {
    // Unauthenticated user routs
    app.post('/api/user', authController.create);
    app.post('/api/user/login', authController.login);
    app.post('/api/user/forgot-password', authController.forgotPassword);

    // Authenticated user routs, use auth middleware
    app.get('/api/user', auth, userController.list);
    app.get('/api/user/:id', auth, userController.view);
    app.delete('/api/user/:id', auth, userController.remove);
};
