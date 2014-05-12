/**
 * User
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

// Just for the fields, the real User model is in home

module.exports = {

    connection: 'mongodb_dev',

    tableName: 'users',

    attributes: {
        name: {
            type: 'string',
            required: true
        },

        email: {
            type: 'email',
            required: true
        },

        password: {
            type: 'string'
        },

        role: {
            type: 'string',
            in: ['admin', 'student', 'teacher'],
            defaultsTo: 'student'
        },

        password_reset_key: {
            type: 'string',
            defaultsTo: null
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            delete obj.password_reset_key;
            return obj;
        }
    }
};
