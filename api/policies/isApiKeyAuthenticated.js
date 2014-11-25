/**
* isApiKeyAuthenticated
*
* @module      :: Policy
* @description ::
* @docs        :: https://github.com/cholalabs/passport-localapikey
* @author      :: Jeff Lee
* @created     :: 2014/09/19
*/

var Passport = require('passport');

module.exports = Passport.authenticate('localapikey', { session: false });
