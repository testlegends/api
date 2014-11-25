/**
 * Client
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

// Just for the fields, the real Client model is in home

module.exports = (function(){

    var connection = 'mongodb_oauth_server';

    var tableName = 'clients';

    var attributes = {
        name: {
            type: 'string'
        },

        clientSecret: {
            type: 'string'
        },

        redirectURI: {
            type: 'json'
        },

        apikey: {
            type: 'string'
        },

        userId: {
            type: 'string'
        },

        icon: {
            type: 'string'
        }
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        connection: connection,
        tableName: tableName,
        attributes: attributes
    };
})();
