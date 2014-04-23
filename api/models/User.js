/**
 * User
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

module.exports = {

    connection: 'mongodb_dev',

    tableName: 'users',

    attributes: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string'
        },
        email: {
            type: 'email'
        },
        role: {
            type: 'string',
            in: ['admin', 'regular']
        },
        password_reset_key: {
            type: 'string',
            defaultsTo: null
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    }
};
