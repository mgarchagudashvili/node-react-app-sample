const cfg = {};

cfg.PORT = 3000;
cfg.JWT_SECRET = 'somethingverysecret';

// DB config
cfg.mongo = {};
cfg.mongo.uri = 'mongodb://localhost:27017/userApp';

module.exports = cfg;
