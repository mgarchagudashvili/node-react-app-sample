const cfg = {};

cfg.PORT = 3000;
cfg.JWT_SECRET = 'somethingverysecretfortest';

// DB config
cfg.mongo = {};
cfg.mongo.uri = 'mongodb://localhost:27017/userAppTest';

module.exports = cfg;
