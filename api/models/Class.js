/**
 * Class
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/21
 */

module.exports = (function(){

    var tableName = 'classes';

    var attributes = {
        name: {
            type: 'string',
            required: true
        },

        desc: {
            type: 'string'
        },

        lists: {
            type: 'array',
            defaultsTo: []
        },

        students: {
            type: 'array',
            defaultsTo: []
        },

        meta: {
            type: 'json',
            defaultsTo: {}
        }
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
