/**
 * User
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

// Just for the fields, the real User model is in home

module.exports = (function(){

    var connection = 'mongodb_oauth_server';

    var tableName = 'users';

    var attributes = {
        name: {
            type: 'string',
            required: true
        },

        email: {
            type: 'email',
            required: true
        },

        role: {
            type: 'string',
            in: ['admin', 'regular'],
            defaultsTo: 'student'
        },

        password: {
            type: 'string'
        },

        password_reset_key: {
            type: 'string',
            defaultsTo: null
        },

        meta: {
            type: 'json',
            defaultsTo: {}
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            delete obj.password_reset_key;
            return obj;
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
