'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config');
const router = require('./src/router');

const app = express();

// DB setup
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri);

// App setup

// Set HTTP headers appropriately
app.use(helmet());
app.use(cors({ exposedHeaders: 'x-auth' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set default template engine to 'handlebars js'
app.set('view engine', 'hbs');
app.use(express.static('public-client'));
router(app);

// Return 404 for non existing routes
app.use((req, res) => {
    res.status(404).send();
});

// Server setup
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

module.exports = { app };
