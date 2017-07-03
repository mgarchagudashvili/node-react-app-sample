const cfg = {};

cfg.PORT = process.env.PORT;
cfg.JWT_SECRET = 'somethingverysecret';

// Mongo DB config
cfg.mongo = {};
cfg.mongo.uri = process.env.MONGO_URI;

module.exports = cfg;
