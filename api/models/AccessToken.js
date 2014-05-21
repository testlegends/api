/**
 * AccessToken
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

// Just for the fields, the real AccessToken model is in home

module.exports = (function(){

    var connection = 'mongodb_oauth_server';

    var tableName = 'access_tokens';

    var attributes = {
        userId: {
            type: 'string'
        },

        clientId: {
            type: 'string'
        },

        token: {
            type: 'string'
        }
    };

    return {
        connection: connection,
        tableName: tableName,
        attributes: attributes
    }
})();
