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
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email'
        },
        password: {
            type: 'string'
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
