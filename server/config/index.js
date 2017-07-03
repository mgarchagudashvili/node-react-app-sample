const env = process.env.NODE_ENV || 'development';

if (['production', 'development', 'staging'].indexOf(env) === -1) {
    console.log('Invalid NODE_ENV!');
    process.exit();
}

const cfg = require(`./config.${env}`);

module.exports = cfg;
