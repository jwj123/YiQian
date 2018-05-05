
const moment = require('moment');
const jwt = require('jwt-simple');
const key = require('../../config/auth/secret.json').key;

module.exports = {
  getToken: function(ssr, secret) {
    const expires = moment().add(7, 'days').valueOf();

    return [
      jwt.encode({
      iss: ssr,
      exp: expires,
    }, key),
    expires];
  },
};